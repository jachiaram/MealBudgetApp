import java.io.*;
import java.util.ArrayList;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws FileNotFoundException, Exception {
        String zipCode = "85142";
        findStores(zipCode);

        ArrayList<String> ingredients = findIngredients();
        System.out.println("");
        for (String ingredient : ingredients) {
            System.out.println(ingredient);
        }
    }

    public static String getHTML(String urlToRead) throws Exception {
        StringBuilder result = new StringBuilder();
        URL url = new URL(urlToRead);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(conn.getInputStream()))) {
            for (String line; (line = reader.readLine()) != null;) {
                result.append(line);
            }
        }
        return result.toString();
    }

    // scrapingBee api call
    public static void scrapingBee() {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(
                        "http://dev.virtualearth.net/REST/v1/Locations/US//85142/locality/addressLine?includeNeighborhood=includeNeighborhood&include=includeValue&maxResults=1&key={Au4H8rRjUEFk8VuhpOG7T3pi-eY_uwG958-zQ5gpJxZCZL-8kaXiTFdrAw7zyEve}"))
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();

        HttpResponse<String> response = null;
        try {
            response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(response.body());
    }

    // convert html to txt file

    // takes in api call for website html, parses through the html to find the list
    // of ingredients and returns it as an
    // ArrayList.
    public static ArrayList<String> findIngredients() throws FileNotFoundException {
        FileReader in = new FileReader("./test.txt");
        BufferedReader reader = new BufferedReader(in);
        int count = 0;
        ArrayList<String> temp = new ArrayList<>();
        try {
            // use switch case to funnel into different cases
            while (reader.readLine() != null) {
                String line = reader.readLine();
                // narrows down to lines that talk ab ingredients
                if (line.indexOf("ingredients") != -1) {
                    temp.add(line);
                    // System.out.println(line);
                    count++;
                }
            }
            reader.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        System.out.println("");
        // System.out.println("Narrowed down to " + count + " lines of code.");

        // narrows down to one line
        String target = "";
        for (int i = 0; i < temp.size(); i++) {
            if (temp.get(i).indexOf("<span") != -1) {
                target = temp.get(i);
            }
        }
        // System.out.println(target);
        System.out.println("");
        temp.clear();

        // finds spans in line and add them to temp AL
        count = 0;
        int k = -1;
        while (target.indexOf("<span") != -1) {
            int index = target.indexOf("<span");
            if (index == 0) {
                target = target.substring(index + 5);
            } else {
                target = target.substring(index);
            }
            if (target.indexOf("</span>") != -1) {
                String sub = target.substring(0, target.indexOf("</span>"));
                if (sub.indexOf("ingredient") != -1) {
                    if ((sub.indexOf(">") + 1) <= sub.length()) {
                        sub = sub.substring(sub.indexOf(">") + 1);
                    }
                    if (temp.size() > 0) {
                        if (!temp.get(k).equals(sub)) {
                            temp.add(sub);
                            k++;
                        }
                    } else {
                        temp.add(sub);
                        k++;
                    }
                    // System.out.println(sub);
                    count++;
                }
            }
        }
        // System.out.println("There are " + count + " span elements in this line.");
        return temp;
    }

    // api call to find latitude and longitude of given zipcode
    public static String findLatLong(String zipCode) throws Exception {
        String geocodeRequest = getHTML(
                "http://dev.virtualearth.net/REST/v1/Locations/US/-/" + zipCode
                        + "/-/-?o=xml&key=Au4H8rRjUEFk8VuhpOG7T3pi-eY_uwG958-zQ5gpJxZCZL-8kaXiTFdrAw7zyEve");

        int start = geocodeRequest.indexOf("<Latitude>") + 10;
        int end = geocodeRequest.indexOf("</Latitude>");
        String lat = geocodeRequest.substring(start, end);

        start = geocodeRequest.indexOf("<Longitude>") + 11;
        end = geocodeRequest.indexOf("</Longitude>");
        String longitude = geocodeRequest.substring(start, end);
        // System.out.println(geocodeRequest);
        // System.out.println(lat);
        // System.out.println(longitude);

        geocodeRequest = lat + "," + longitude;
        return geocodeRequest;
    }

    // api call to find stores nearby
    public static ArrayList<String> findStores(String zipCode) throws Exception {
        String coords = findLatLong(zipCode);
        String nearbySearch = getHTML("https://dev.virtualearth.net/REST/v1/LocalSearch/?query=grocery&userLocation="
                + coords + "&key=Au4H8rRjUEFk8VuhpOG7T3pi-eY_uwG958-zQ5gpJxZCZL-8kaXiTFdrAw7zyEve");

        int start = nearbySearch.indexOf("al\":") + 4;
        String estimatedTotal = nearbySearch.substring(start);
        int end = estimatedTotal.indexOf(",");
        estimatedTotal = estimatedTotal.substring(0, end);
        int total = Integer.parseInt(estimatedTotal);
        for (int i = 0; i < total; i++) {

            int temp = nearbySearch.indexOf("SearchResult");
            int tempEnd = nearbySearch.indexOf("Display");

            // seperating search results into items
            String item = nearbySearch.substring(temp, tempEnd);

            // getting the name of the store
            int nameStart = item.indexOf("name") + 7;
            item = item.substring(nameStart);
            int nameEnd = item.indexOf("\"");
            String name = item.substring(0, nameEnd);
            System.out.println(name);

            // getting the address of the store
            int addStart = item.indexOf("Line") + 7;
            item = item.substring(addStart);
            int addEnd = item.indexOf("\"");
            String address = item.substring(0, addEnd);
            System.out.println(address);

            // retrieving website url of the store
            int webStart = item.indexOf("Website") + 10;
            item = item.substring(webStart);
            int webEnd = item.indexOf("\"");
            String website = item.substring(0, webEnd);
            System.out.println(website);

            System.out.println("");
            nearbySearch = nearbySearch.substring(tempEnd + 10);
        }
        return new ArrayList<>();
    }

    // takes list of ingredients and stores and finds what ingredients are at which
    // stores; Including the prices of the
    // ingredients found, 2D array might be needed here to present different options
    // to the user (group array ingredient
    // per row, store by column).
    public static ArrayList<String> findPrices(ArrayList<String> Ingredients) {

        return new ArrayList<>();
    }

}
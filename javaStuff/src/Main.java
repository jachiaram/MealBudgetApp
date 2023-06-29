import java.io.*;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) throws FileNotFoundException {
        ArrayList<String> ingredients = new ArrayList<>();
        findIngredients(ingredients);
        System.out.println("");

        for (String ingredient : ingredients) {
            System.out.println(ingredient);
        }
    }

    // scrapingBee api call

    // convert html to txt file

    // takes in api call for website html, parses through the html to find the list
    // of ingredients and returns it as an
    // ArrayList.
    public static ArrayList<String> findIngredients(ArrayList<String> arr) throws FileNotFoundException {
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
                    System.out.println(line);
                    count++;
                }
            }
            reader.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        System.out.println("");
        System.out.println("Narrowed down to " + count + " lines of code.");

        // narrows down to one line
        String target = "";
        for (int i = 0; i < temp.size(); i++) {
            if (temp.get(i).indexOf("<span") != -1) {
                target = temp.get(i);
            }
        }
        System.out.println(target);
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
                    if (arr.size() > 0) {
                        if (!arr.get(k).equals(sub)) {
                            arr.add(sub);
                            k++;
                        }
                    } else {
                        arr.add(sub);
                        k++;
                    }
                    System.out.println(sub);
                    count++;
                }
            }
        }
        System.out.println("There are " + count + " span elements in this line.");
        System.out.println("Done.");
        return arr;
    }

    // api call to find stores nearby
    public static ArrayList<String> findStores() {
        return new ArrayList<>();
    }

    // takes list of ingredients and stores and finds what ingredients are at which
    // stores; Including the prices of the
    // ingredients found, 2D array might be needed here to present different options
    // to the user (group array ingredient
    // per row, store by column).
    public static ArrayList<String> findPrices(ArrayList<String> Ingredients, ArrayList<String> Stores) {
        return new ArrayList<>();
    }
}
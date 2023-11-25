class Ingredient {
    
    setName(name) {
        this.name = name;
    };

    setPrice(price) {
        this.price = price;
    };

    setSource(source) {
        this.source = source;
    };
}

async function getHTML(url) {
    //fetches html for recipe website
    const response = await fetch(url).then(x => x.text());
    return response;
  }

//SERPAPI call
async function getSearch(url) {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
} 

//right now this just finds metadata
async function retrieveIngredients(url) {
    var html = await getHTML(url);
    var ingredients = new Array();
    //console.log(html);
    if(html.indexOf("type=\"application/ld+json\"") !== -1) {
        html = html.substring(html.indexOf("type=\"application/ld+json\""));
        html = html.substring(0, html.indexOf("</script>"));
    }

    if(html.indexOf("recipeIngredient") !== -1) {
        html = html.substring(html.indexOf("recipeIngredient") + 19);
        html = html.substring(0, html.indexOf("]"));
    }

    html.split("\"").forEach((entry) => {
       if(entry !== "," && entry !== "") {
            ingredients.push(entry);
       }
    });
    
    return ingredients;
}

//google search result for each ingredient
async function googleSearch(current, zip) {
   let ingreds = new Array();
    if(current.includes(" ")) {
        current.replaceAll(" ", "+");
    }

    let url = "https://serpapi.com/search.json?engine=google_shopping&location=" + zip + "&q=" + current + "&api_key=6cd5f8f67243095eb46d38c9579e86ca5b2074636e6b236d906299e613b517ae&output=JSON";
    let shoppingResults = await getHTML(url);

    let start = shoppingResults.indexOf("\"shopping_results\":");
    let end = shoppingResults.indexOf("\"categories\":");

    shoppingResults = shoppingResults.substring(start + 32, end);
    let ingredients = new Array();
    var itemStart = shoppingResults.indexOf("\"position\":") + 20;
    var itemEnd = shoppingResults.indexOf("\"rating\"");
    for (let i = 0; i < 1; i++) {
        let result = shoppingResults.substring(itemStart, itemEnd);
        ingredients.push(result);
        shoppingResults = shoppingResults.substring(itemEnd + 10);
        itemStart = shoppingResults.indexOf("\"position\":") + 15;
        itemEnd = shoppingResults.indexOf("\"rating\"");
    }

    let aspects = new Array();
    ingredients.forEach(value => {
        aspects = value.split("\n"); 
        let temp = new Ingredient();
        aspects.forEach(aspect => {
            if(aspect.includes("\"title\":") && !aspect.includes("Member")) {
                //console.log(aspect.substring(aspect.indexOf("\"") + 10, aspect.indexOf("\",")));
                temp.setName(aspect.substring(aspect.indexOf("\"") + 10, aspect.indexOf("\",")));
             } 
            
            if(aspect.includes("\"price\":") && aspect.includes("$")) {
                //console.log(aspect.substring(aspect.indexOf("\"") + 10, aspect.indexOf("\",")));
                temp.setPrice(aspect.substring(aspect.indexOf("\"") + 10, aspect.indexOf("\",")));
            }
            
            if(aspect.includes("\"link\":") && !aspect.includes("Member")) {
                //console.log(aspect.substring(aspect.indexOf("\"") + 9, aspect.indexOf("\",")));
                temp.setSource(aspect.substring(aspect.indexOf("\"") + 9, aspect.indexOf("\",")));
             } 
        });
        if(temp.name !== undefined) {
            ingreds.push(temp);
        }
    });
    return ingreds;
}

async function getPrices(url) {
    var ingredients = await retrieveIngredients(url);
    var ingreds = new Array();
    ingredients.forEach(async (ingredient) => {
        var temp = await googleSearch(ingredient, "60448");
        if(temp[0] !== undefined) {
            ingreds.push(temp[0]);
        }
    });
    //console.log(ingreds);
    return ingreds;
}

export {
    Ingredient,
    getHTML,
    getSearch,
    retrieveIngredients,
    googleSearch,
    getPrices,
  };
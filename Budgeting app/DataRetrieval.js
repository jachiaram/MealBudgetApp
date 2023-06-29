
//scrapingBee api call
const url = 'https://scrapingbee.p.rapidapi.com/?url=https%3A%2F%2Fwww.justonecookbook.com%2Fchicken-katsu%2F&render_js=false';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '312e94bb12msh18db60e2ec9b6b2p11cc25jsna3a027690f0a',
		'X-RapidAPI-Host': 'scrapingbee.p.rapidapi.com'
	}
};

async function retrieveData() {
try {
	const response = await fetch(url, options);
	const result = await response.text();
	//console.log(result);
	return result;
} catch (error) {
	console.error(error);
}
}

//yummly api call
const url2 = 'https://yummly2.p.rapidapi.com/feeds/auto-complete?q=';
const options2 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '312e94bb12msh18db60e2ec9b6b2p11cc25jsna3a027690f0a',
		'X-RapidAPI-Host': 'yummly2.p.rapidapi.com'
	}
};


async function retrieveIngredient(url2) {
try {
	const response = await fetch(url2, options2);
	var result = await response;
	console.log(response);
	var start = result.indexOf("[");
	var end = result.indexOf("]");
	result = result.substring(start + 1, end);
	result.replace(/['"]+/g, '');
	console.log(result);
	var data = result.split(",");
	console.log(data);
	console.log(typeof(data));
	return data;
	
} catch (error) {
	console.error(error);
}
}

//global variables
var ingredientList = [];


//needs to convert html to txt
function convertToTxt() {
const fs = require("fs");
const website = retrieveData();
console.log(website);
website.then(function(result)  {
	console.log(result);
fs.writeFile("./test1.txt", result, (err) => {
if (err) {
    console.error(err);
return;
  }
});
console.log("Data has been Written");
})
}

//finds ingredients using a database to find the words in the txt file, and recipe name, etc.
function findIngredients() {
	//convertToTxt();
	const fs = require('fs')
	let k = 0;
	console.time('Time');
	const allContents = fs.readFileSync('./test.txt', 'utf-8');
	allContents.split(/\r?\n/).forEach((line) => {
  /*this split line by line, so each line needs to be converted into a string 
  and split into an array of words, 
  then those need to be checked using the api call
  if the word is an ingredient it needs to be added to a list of ingredients 
  */ 
		console.log('line: ', line);
		if(line.indexOf(" ") > 0) {
			//api call to check to see if line is an ingredient
			var tempUrl = url2 + line;
			if(retrieveIngredient(tempUrl)) {
				ingredientList[k] = line;
				k++;
				console.log(ingredientList[k]);
			}
		} else {
			//splits line into words
			let words = [];
			let j = 0;
			while(line.indexOf(" ") > 0) {
				words[j] = line.split(" ");
				console.log(words[j]);
				j++;
			}

			//checks to see if the words are ingredients and adds them to ingredient list
			for(let i = 0; i < words.length; i++) {
				var tempUrl = url2 + words[i];
				if(retrieveIngredient(tempUrl)) {
					ingredientList[k] = words[i];
					k++;
					console.log(ingredientList[k]);
				}
			}
		}
	});
	console.log(`Used ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);
	console.timeEnd('Time');
}

//takes ingredient list and zip code, finds stores nearby, gets multiple options for ingredients, and returns the prices
function findStoresNearby() {

}

function sifting() {
	var i = 0;
	const fs = require('fs');
	console.time('Time');
	const allContents = fs.readFileSync('./test.txt', 'utf-8');
	allContents.split(/\r?\n/).forEach((line) => {
		if(line.indexOf("<li>") != -1) {
			var start = line.indexOf("<li>");
			var end = line.indexOf("</li>");
			ingredientList[i] = line.substring(start, end);
			i++;
		}
		//console.log('line: ', line);
	});
	console.log(ingredientList);
}

//findIngredients();
/*
var url1 = url2 + 'chicken';
var ingredientsFound = retrieveIngredient(url1);
ingredientsFound.then(function(result)  {
console.log(result[0].charAt(0));
})
*/

sifting();




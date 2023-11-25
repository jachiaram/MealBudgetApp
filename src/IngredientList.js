import React from "react";

function IngredientList({customData}) {
    var totalCost = 0.00;
    const arrayDataItems = customData.map((ingredient) => (
      <IngredientItem
        key={ingredient.name} // Add a unique key for each item
        name={ingredient.name}
        price={ingredient.price}
        source={ingredient.source}
      />
    ));
    
    customData.forEach(ingredient => {
      console.log(ingredient.price);
      if(ingredient.price !== undefined) {
        totalCost += parseFloat(ingredient.price.substring(1));
        console.log(totalCost);
        console.log(totalCost);
      }
      
    });
   totalCost = Math.round(totalCost * 100) / 100;
    return (
      <div>
        <h4>Ingredients Found</h4>
        <ul>{arrayDataItems}</ul>
        <p>The total cost of these items is ${totalCost}.</p>
      </div>
    );
  }
  
  function IngredientItem({name, price, source}) {
    return (
      <div>
        <p>{name} {price}</p>
      </div>
    )
  }

  export default IngredientList;
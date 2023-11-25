import React, { useState } from 'react';
import IngredientList from './IngredientList';
import { getPrices } from './helpers';

function TextBar() {
  const [url, setUrl] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const handleChange = event => {
    setUrl(event.target.value);
  }

  const getIngredients = async () => {
    try {
      const updatedIngredients = await getPrices(url);
      setIngredients(updatedIngredients);
      console.log(updatedIngredients);
    } catch (error) {
      console.error('Error fetching data: enter a usable url', error);
    }
  }

  return (
    <div>
      <div>
        <label>Enter a URL: </label>
        <input 
          type="text"
          name="url"
          id="url"
          onChange={handleChange}
          value={url}
        />
        <button onClick={getIngredients}>Click Me</button>
      </div>
      <IngredientList customData={ingredients} />
    </div>
  );
}

export default TextBar;
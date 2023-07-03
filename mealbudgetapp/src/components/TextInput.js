import React from 'react';

const TextInput = (props) => {
  return (
      <div>
      <input 
      id="test"
        type="text"
        value={props.value}
        onChange={e => console.log(props.value)}
      />
      <button
      onClick={e => {
        console.log("Clicked"); 
    }}
      >Submit</button>
      </div>
    )
  }

  export default TextInput;
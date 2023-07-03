import React from 'react';
import TextInput from '../components/TextInput';


function Home() {
    return(
        <div>
            <div>
                <h1>Welcome to the MealBudget Website</h1>
                <TextInput
                    id="test"
                    placeholder="testing"
                    validatge="numeric"
                    events={{
                        onChange: (data) => console.log(data)
                    }}
                />
           </div>
           <div>
                    <p>This is the ingredient list component</p>
           </div>
        </div>
        
    );
}

export default Home;
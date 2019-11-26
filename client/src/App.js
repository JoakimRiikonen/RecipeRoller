import React, { useState, useEffect } from 'react'
import recipeService from './services/recipes'

const App = () => {

  const [recipes, setRecipes] = useState({})

  useEffect(() => {
    recipeService
      .getAll()
      .then(recipes => {
        setRecipes(recipes)
      })
  }, [])

  console.log(recipes)

  return (
    <div className="App">
      moi
    </div>
  );
}

export default App;

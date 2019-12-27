import React, { useState, useEffect } from 'react'
import Menu from './components/Menu'
import Frontpage from './components/Frontpage'
import Recipe from './components/Recipe'
import AddRecipe from './components/AddRecipe'
import recipeService from './services/recipes'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const App = () => {

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    recipeService
    .getAll()
    .then(data => {
      setRecipes(data)
      console.log(data)
    })
  }, [])

  const addRecipe = (recipe) => {
    console.log('hello')
    setRecipes(recipes.concat(recipe))
    return recipes.length
  }

  if(recipes.length === 0){
    return (
      <div></div>
    )
  }

  return (
    <Router>
      <Menu/>
      <Route exact path='/' render={() => (
        <Frontpage recipeCount={recipes.length}/>
      )}/>
      <Route exact path='/recipe/:id' render={({ match }) => (
        <Recipe
          recipe={recipes[match.params.id-1]}
          recipeCount={recipes.length}
        />
      )}/>
      <Route exact path='/add' render={() => (
        <AddRecipe addRecipe={addRecipe}/>
      )}/>
    </Router>
  );
}

export default App;

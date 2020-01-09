import React, { useState, useEffect } from 'react'
import Menu from './components/Menu'
import Frontpage from './components/Frontpage'
import Recipe from './components/Recipe'
import RecipesList from './components/RecipesList'
import AddRecipe from './components/AddRecipe'
import About from './components/About'
import EmptyPage from './components/EmptyPage'
import recipeService from './services/recipes'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

const App = () => {

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    recipeService
    .getAll()
    .then(data => {
      setRecipes(data)
    })
  }, [])

  const addRecipe = (recipe) => {
    //setting state is asynchronous, however await does not work
    //I should probably be using redux but its too late for that now
    let r = recipes.length
    setRecipes([...recipes, recipe])
    return r + 1
  }

  if(recipes.length === 0){
    return (
      <div></div>
    )
  }

  return (
    <Router>
      <Menu/>
      <Switch>
        <Route exact path='/' render={() => (
          <Frontpage recipeCount={recipes.length}/>
        )}/>
        <Route exact path='/recipe/:id' render={({ match }) => (
          <Recipe
            recipe={recipes[match.params.id-1]}
            recipeCount={recipes.length}
          />
        )}/>
        <Route exact path='/recipes' render={() => (
          <RecipesList recipes={recipes}/>
        )}/>
        <Route exact path='/add' render={() => (
          <AddRecipe addRecipe={addRecipe}/>
        )}/>
        <Route exact path='/about' render={() => (
          <About/>
        )}/>
        <Route>
          <EmptyPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import recipeService from '../services/recipes'

const Container = styled.div`
  font-family: "montserrat", "Helvetica", Sans-serif;
  
  width: 800px;
  margin: 0 auto;

  @media(max-width: 888px){
    width: 90%;
  }
`

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
`

const FieldTitle = styled.h3`
  padding-left: 10px;
  letter-spacing: .05em;
  margin-bottom: 4px;
  font-size: 20px;
`

const TextField = styled.input`
  font-family: "montserrat", "Helvetica", Sans-serif;
  width: 100%;
  font-size: 20px;
  padding: 12px 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid black;
  box-sizing: border-box;
`

const SubTextField = styled(TextField)`
  width: 97%;
  margin-left: 3%;
`

const TextareaField = styled.textarea`
  font-family: "montserrat", "Helvetica", Sans-serif;
  height: 140px;
  width: 100%;
  font-size: 20px;
  padding: 12px 10px;
  border-radius: 5px;
  border: 1px solid black;
  box-sizing: border-box;
  resize: vertical;
`

const SubmitButton = styled.input.attrs({ type: 'submit'})`
  display: block;
  font-family: "montserrat", "Helvetica", Sans-serif;
  background: white;
  width: 60%;
  font-size: 20px;
  font-weight: bold;
  margin: 0 auto;
  margin-top: 20px;
  padding: 12px 10px;
  border-radius: 5px;
  border: 2px solid black;
  box-sizing: border-box;
  text-align: center;

  &:hover {
    cursor: pointer;
    color: orange;
  }
`

const Errors = styled.div`
  color: red;
`
const AddRecipe = (props) => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [ingredientGroups, setIngredientGroups] = useState([
    {
      'name': 'base',
      'ingredients': ['']
    },
    {}
  ])
  const [instructions, setInstructions] = useState(['',])
  const [tags, setTags] = useState(['',])
  const [authKey, setAuthKey] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  var errorTimeout = undefined

  useEffect(() => {
    return function cleanup() {
      clearTimeout(errorTimeout)
    }
  })

  const submitForm = async (event) => {
    event.preventDefault()
    if(!validateForm()) return
    let newRecipe = createRecipeObject()
    let okToRedirect = false
    let recipesCount = 0
    await recipeService.create(newRecipe)
      .then((data) => {
        recipesCount = props.addRecipe(data)
        okToRedirect = true
      })
      .catch(err => {
        console.log(err)
        if(err.response.status === 403){
           setErrorMessage('Incorrect authorization key.')
        }
        else if(err.response.status === 400){
          setErrorMessage('Unexpected error has occured.')
          console.log(err.response.data)
        }
      })
    if(okToRedirect) props.history.push(`/recipe/${recipesCount}`)
  }

  const validateForm = () => {
    //value checks
    if(name === ''){
      setErrorMessage('Name is required.')
      return false
    }
    if(name.length > 50){
      setErrorMessage('Name can not be longer than 50 letters.')
    }
    if(description === ''){
      setErrorMessage('Description is required.')
      return false
    }
    if(description.length > 500){
      setErrorMessage('Description can not be longer than 500 letters.')
      return false
    }
    if(ingredientGroups[0].ingredients.filter(Boolean).length === 0 && 
      (ingredientGroups[1].name === undefined || ingredientGroups[1].ingredients[0] === '')){
      setErrorMessage('At least one ingredient is required.')
      return false
    }
    if(instructions.filter(Boolean).length === 0){
      setErrorMessage('At least one instruction step is required.')
      return false
    }
    if(tags.filter(Boolean).length === 0){
      setErrorMessage('At least one tag is required.')
      return false
    }
    if(tags.filter(tag => tag.length > 20).length !== 0){
      setErrorMessage('A tag can not be longer than 20 letters.')
    }
    if(authKey === ''){
      setErrorMessage('Auth key is required.')
      return false
    }
    return true
  }

  const createRecipeObject = () => {
    let r = {
      name,
      description,
      tags: [],
      ingredient_groups: [],
      instruction_groups: [{
        title: 'base',
        instructions: []
      }],
      token: authKey
    }

    tags.filter(Boolean).forEach(tag => {
      r.tags.push({name: tag})
    })

    ingredientGroups.forEach((group) => {
      if(group.name === undefined || group.name === '') return
      let g = {
        title: group.name,
        ingredients: []
      }
      group.ingredients.filter(Boolean).forEach((ingredient) => {
        g.ingredients.push({name: ingredient})
      })
      r.ingredient_groups.push(g)
    })

    instructions.filter(Boolean).forEach(instruction => {
      r.instruction_groups[0].instructions.push({description: instruction})
    })

    return r
  }

  const handleIngredientChange = (value, groupIndex, i) => {
    console.log(value + ' ' + groupIndex + ' ' + i)
    //apparently the correct way to clone a dict in JS
    let initialIG = JSON.parse(JSON.stringify(ingredientGroups))
    if(i === 'name'){
      initialIG[groupIndex].name = value
      if(initialIG.length === groupIndex + 1){
        initialIG[groupIndex].ingredients = ['']
        initialIG.push({})
      }
    }
    else{
      initialIG[groupIndex].ingredients[i] = value
      if(initialIG[groupIndex].ingredients[initialIG[groupIndex].ingredients.length-1]){
        initialIG[groupIndex].ingredients.push('')
      }
    }
    setIngredientGroups(initialIG)
  }

  const handleInstructionChange = (value, i) => {
    let initialInstructions = [...instructions]
    initialInstructions[i] = value
    if(initialInstructions[initialInstructions.length-1]){
      initialInstructions.push('')
    }
    setInstructions(initialInstructions)
  }

  const handleTagChange = (value, i) => {
    let initialTags = [...tags]
    initialTags[i] = value
    if(initialTags[initialTags.length-1]){
      initialTags.push('')
    }
    setTags(initialTags)
  }

  return(
    <Container>
      <form onSubmit={submitForm}>
        <Title>Add a recipe</Title>
        <Errors>{errorMessage}</Errors>
        <FieldTitle>Name</FieldTitle>
        <TextField
          placeholder='Name'
          onChange={({ target }) => setName(target.value)}
        />
        <FieldTitle>Description</FieldTitle>
        <TextareaField
          placeholder='Description'
          onChange={({ target }) => setDescription(target.value)}
        />
        <FieldTitle>Ingredients</FieldTitle>
        {ingredientGroups[0].ingredients.map((ingredient, i) => {
          if(ingredient !== "") return (
            <SubTextField
              key={i}
              placeholder='Add a groupless ingredient'
              value={ingredientGroups[0].ingredients[i]}
              onChange={({ target }) => handleIngredientChange(target.value, 0, i)}
            />
          )
          else return(
            <SubTextField
              style={{border: '1px solid #999'}}
              key={i}
              placeholder='Add a groupless ingredient'
              value={ingredientGroups[0].ingredients[i]}
              onChange={({ target }) => handleIngredientChange(target.value, 0, i)}
            />
          )
        })}
        {ingredientGroups.slice(1).map((group, i) => {
          if(group.name) return (
            <div key={i}>
              <TextField
                key={i}
                placeholder='Add an ingredient group'
                onChange={({ target }) => handleIngredientChange(target.value, i+1, 'name')}
              />
              {group.ingredients.map((ingredient, j) => {
                if(ingredient !== "") return (
                  <SubTextField
                    key={j}
                    placeholder='Add an ingredient'
                    value={ingredientGroups[i+1].ingredients[j]}
                    onChange={({ target }) => handleIngredientChange(target.value, i+1, j)}
                  />
                )
                else return(
                  <SubTextField
                    style={{border: '1px solid #999'}}
                    key={j}
                    placeholder='Add an ingredient'
                    value={ingredientGroups[i+1].ingredients[j]}
                    onChange={({ target }) => handleIngredientChange(target.value, i+1, j)}
                  />
                )
              })}
            </div>
          )
          else return( 
            <div key={i}>
              <TextField
                style={{border: '1px solid #999'}}
                key={i}
                placeholder='Add an ingredient group'
                onChange={({ target }) => handleIngredientChange(target.value, i+1, 'name')}
              />
            </div>
          )
        })}
        <FieldTitle>Instructions</FieldTitle>
        {instructions.map((instruction, i) => {
          if(instruction !== "") return (
            <TextField
              key={i}
              placeholder='Add an instruction'
              value={instruction}
              onChange={({ target }) => handleInstructionChange(target.value, i)}
            />
          )
          else return(
            <TextField
              style={{border: '1px solid #999'}}
              key={i}
              placeholder='Add an instruction'
              value={instruction}
              onChange={({ target }) => handleInstructionChange(target.value, i)}
            />
          )
        })}
        <FieldTitle>Tags</FieldTitle>
        {tags.map((tag, i) => {
          if(tag !== "") return (
            <TextField
              key={i}
              placeholder='Add a tag'
              value={tag}
              onChange={({ target}) => handleTagChange(target.value, i)}
            />
          )
          else return(
            <TextField
              style={{border: '1px solid #999'}}
              key={i}
              placeholder='Add a tag'
              value={tag}
              onChange={({ target}) => handleTagChange(target.value, i)}
            />
          )
        })}
        <FieldTitle>Authorization Key</FieldTitle>
        <TextField
          placeholder='Confirm the authorization key'
          onChange={({ target }) => setAuthKey(target.value)}
        />
        <SubmitButton value="Submit"/>
      </form>
    </Container>
  )
}

export default withRouter(AddRecipe)
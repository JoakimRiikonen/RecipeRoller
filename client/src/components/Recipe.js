import React from 'react'
import Ingredients from './Ingredients'
import Instructions from './Instructions'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const Recipe = (props) => {

  console.log(props.recipe)
  
  const handleClick = () => {
    if(props.recipeCount === 0){
      console.log('fetching data, please wait...')
      return
    }
    console.log(props.recipeCount)
    const recipeId = Math.floor(Math.random() * props.recipeCount + 1)
    props.history.push(`/recipe/${recipeId}`)
  }

  const UpperContainer = styled.div`
    text-align: center;
    font-family: "montserrat", "Helvetica", Sans-serif;
    width: 1000px;
    margin: 0 auto;
  `

  const LowerContainer = styled.div`
    margin: 0 auto;
    display: flex;
    width: 1000px;
    justify-content: center;
  `

  const Title = styled.h1`
    font-size: 50px;
  `

  const Description = styled.p`
    font-size: 20px;
    width: 80%;
    padding-left: 10%;
  `

  if(props.recipe === undefined){
    return(<div></div>)
  }

  return(
    <>
    <UpperContainer>
      <Title>{props.recipe.name}</Title>
      <Description>{props.recipe.description}</Description>
      {/* {props.recipe.image_url ? (
        <img src={props.recipe.image_url} alt="food"/>
      ) : (
        <div>no image :(</div>
      )} */}
    </UpperContainer>
    <LowerContainer>
      <Ingredients ingredients={props.recipe.ingredient_groups}/>
      <Instructions instructions={props.recipe.instruction_groups}/>
    </LowerContainer>
    {/* <button onClick={handleClick}>roll for another one</button> */}
  </>
  )
}

export default withRouter(Recipe)
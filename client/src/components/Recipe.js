import React from 'react'
import Tags from './Tags'
import Ingredients from './Ingredients'
import Instructions from './Instructions'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const Recipe = (props) => {

  console.log(props.recipe)

  const UpperContainer = styled.div`
    text-align: center;
    font-family: "montserrat", "Helvetica", Sans-serif;
    width: 1000px;
    margin: 0 auto;

    @media(max-width: 1000px){
      width: 100%;
    }
  `

  const LowerContainer = styled.div`
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    width: 1000px;
    justify-content: center;

    @media(max-width: 1000px){
      width: 90%;
      flex-direction: column;
    }
  `

  const Title = styled.h1`
    font-size: 50px;
    margin-bottom: 10px;
  `

  const Description = styled.p`
    font-size: 20px;
    width: 80%;
    padding-left: 10%;
  `

  if(props.recipe === undefined){
    return(
      <UpperContainer>
        <Title>404 :(</Title>
        <Description>No recipes to be seen here.</Description>
      </UpperContainer>
    )
  }

  return(
    <>
    <UpperContainer>
      <Title>{props.recipe.name}</Title>
      <Tags tags={props.recipe.tags}/>
      <Description>{props.recipe.description}</Description>
    </UpperContainer>
    <LowerContainer>
      <Ingredients ingredients={props.recipe.ingredient_groups}/>
      <Instructions instructions={props.recipe.instruction_groups}/>
    </LowerContainer>
  </>
  )
}

export default withRouter(Recipe)
import React from 'react'
import RollButton from './RollButton'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const Frontpage = (props) => {

  const handleClick = () => {
    if(props.recipeCount === 0){
      console.log('fetching data, please wait...')
      return
    }
    console.log(props.recipeCount)
    const recipeId = Math.floor(Math.random() * props.recipeCount + 1)
    props.history.push(`/recipe/${recipeId}`)
  }

  const Container = styled.div`
    text-align: center;
    padding-top: 30px;
  `
  
  const Title = styled.h1`
    font-family: "Alatsi", "Verdana", Sans-serif;
    font-size: 50px;
  `

  return(
    <Container>
      <Title>RECIPE ROLLER</Title>
      {/* <Description>Funny one liner</Description> */}
      <RollButton onClick={handleClick}/>
    </Container>
  )
}

export default withRouter(Frontpage)
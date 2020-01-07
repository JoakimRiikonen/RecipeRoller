import React from 'react'
import styled from 'styled-components'

import RecipeCard from './RecipeCard'

const Container = styled.div`
  font-family: "montserrat", "Helvetica", Sans-serif;
    
  width: 800px;
  margin: 0 auto;
  

  @media(max-width: 888px){
    width: 90%
  }
`

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
`

const RecipesList = ({ recipes }) => {

  return(
    <Container>
      <Title>All recipes</Title>
        {recipes.map((recipe, i) => (
          <RecipeCard key={i} recipe={recipe} index={i+1}/>
        ))}
    </Container>
  )
}

export default RecipesList
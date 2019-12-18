import React from 'react'
import styled, { keyframes } from 'styled-components'
import Ingredient from './Ingredient'

const Ingredients = ({ingredients}) => {

  const Container = styled.div`
    font-family: "montserrat", "Helvetica", Sans-serif;
    width: 100%
    flex: 0 0 50%;
  `

  const Title = styled.h2`
    font-size: 40px;
    margin-bottom: 20px;
    font-weight: normal;
  `

  const SubTitle = styled.h4`
    font-size: 30px;
    font-weight: normal;
    margin-bottom: 15px;
  `

  const List = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
  `


  const ListElement = styled.li`
    font-size: 25px;
    display: flex;
    padding: 4px;
    padding-left: 15px;
  `

  return(
    <Container>
      <Title>Ingredients</Title>
      {ingredients.map((group, i) => {
        if(group.title === "base"){
          return(
            <List key={i}>
              {group.ingredients.map((ingredient, j) => (
                <Ingredient
                  key={j}
                  name={ingredient.name}
                />
              ))}
            </List>
          )
        }
        else{
          return(
            <div key={i}>
              <SubTitle>{group.title}</SubTitle>
              <List key={i}>
                {group.ingredients.map((ingredient, j) => (
                  <Ingredient
                    key={j}
                    name={ingredient.name}
                  />
                ))}
              </List>
            </div>
          )
        }
      })}
    </Container>
  )
}

export default Ingredients
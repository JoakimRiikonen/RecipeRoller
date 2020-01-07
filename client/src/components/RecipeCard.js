import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ContainerLink = styled(Link)`
  padding: 5px;
  display: block;
  margin: 5px;
  text-decoration: none;

  border-top: 2px solid white;
  border-bottom: 2px solid white;

  &:hover {
    border-top: 2px solid grey;
    border-bottom: 2px solid grey;
  }
`

const Title = styled.span`
  font-size: 30px;
  color: black;
  word-break: break-all;
`

const TagContainer = styled.div`
  display: inline;
`

const Tag = styled.div`
  display: inline-block;
  color: orange;
  font-weight: bold;
  padding: 5px;
` 

const RecipeCard = ({ recipe, index }) => {
  
  return(
      <ContainerLink to={`/recipe/${index}`}>
        <Title>{recipe.name}</Title>
        <TagContainer>
          {recipe.tags.map((tag, i) => (
            <Tag key={i}>{tag.name}</Tag>
          ))}
        </TagContainer>
      </ContainerLink>
  )
}

export default RecipeCard
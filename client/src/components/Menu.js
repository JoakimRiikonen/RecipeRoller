import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Menu = (props) => {

  const Container = styled.div`
    text-align: center;
    border-bottom: 2px solid black;
    padding-top: 3px;
    padding-bottom: 10px;
    margin: 0 10px;
  `

  const Button = styled(Link)`
    padding: 10px;
    margin: 5px;
    font-family: "montserrat", "Verdana", Sans-serif;
    font-weight: bold;
    color: black;
    text-decoration: none;
    letter-spacing: .1em;

    transition: color 0.1s;

    &:hover {
      color: orange;
    }
  `

  return (
    <Container>
        <Button to='/'>ROLL</Button>
        <Button to='/recipes'>ALL RECIPES</Button>
        <Button to='/add'>ADD RECIPE</Button>
        <Button to='/about'>ABOUT</Button>
    </Container>
  )
}

export default Menu
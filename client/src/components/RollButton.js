import React from 'react'
import styled from 'styled-components'

const RollButton = (props) => {

  const ButtonContainer = styled.div`
    width: 250px;
    height: 250px;
    position: relative;
    margin: 0 auto;
    border-radius: 50%;
  `

  const Highlight = styled.span`
    transition: color 0.2s;
  `

  const Button = styled.button`
    position: absolute;
    top: 7px;
    bottom: 0;
    left: 7px;
    right: 0;
    display: block;
    background-color: white;
    color: black;
    text-align: center;
    margin: 0 auto;
    text-decoration: none;
    font-family: "Alatsi", "Verdana", Sans-serif;
    font-size: 35px;
    outline: none;

    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid black;

    transition: border 0.2s;

    &:hover {
      cursor: pointer;
      border: 3px solid black;
    }

    &:active {
      border: 3px solid orange;
    }

    &:hover ${Highlight} {
      color: orange;
    }
  `

  return(
    <ButtonContainer>
      <Button onClick={props.onClick}>
          CLICK TO <Highlight>ROLL</Highlight>
      </Button>
    </ButtonContainer>
  )
}

export default RollButton
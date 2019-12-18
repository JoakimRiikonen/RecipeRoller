import React from 'react'
import styled, { keyframes } from 'styled-components'

const RollButton = (props) => {

  const Container = styled.div`
    text-align: center;
    padding-top: 30px;
  `

  const Description = styled.p`
  `

  const Title = styled.h1`
    font-family: "Alatsi", "Verdana", Sans-serif;
    font-size: 50px;
  `

  const ButtonContainer = styled.div`
    width: 250px;
    height: 250px;
    position: relative;
    margin: 0 auto;
    border-radius: 50%;
  `

  //keyframe
  const rotate = keyframes`
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
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

    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid black;
  `

  const ButtonEdge = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;

    padding: 4px;
    border: 3px solid black;
    border-radius: 50%;
    border-top-color: white;
    border-bottom-color: white;

    ${ButtonContainer}:hover & {
      animation: ${rotate} 2s linear infinite;
    }
  `
  
  return (
    <ButtonContainer>
        <ButtonEdge/>
        <Button onClick={props.onClick}>
          CLICK TO ROLL
        </Button>
    </ButtonContainer>
  )
}

export default RollButton
import React, { useState } from 'react'
import styled from 'styled-components'
import Instruction from './Instruction'

const Instructions = ({instructions}) => {

  const [step, setStep] = useState(-1)

  const handleClick = (s) => {
    if(s === step) setStep(-1)
    else setStep(s)
  }

  const Container = styled.div`
    font-family: "montserrat", "Helvetica", Sans-serif;
    width: 100%
    flex: 0 0 50%;
    padding-bottom: 20px;
  `

  const Title = styled.h2`
    font-size: 40px;
    margin-bottom: 20px;
    font-weight: normal;
  `

  const SubTitle = styled.h4`
    font-size: 30px;
    font-weight: normal;
    margin-bottom: 20px;
  `

  const List = styled.ol`
    margin: 0;
    padding-left: 40px;
  `

  const ListElement = styled.li`
    font-size: 25px;
    margin: 5px;

    &:hover {
      border-top: 2px solid black;
      border-bottom: 2px solid black;
    }
  `

  /* <ListElement key={j} onClick={() => handleClick(j)}>
                  {instruction.description}
                </ListElement> */

  return(
    <Container>
      <Title>Instructions</Title>
      {instructions.map((group, i) => {
        if(group.title === "base"){
          return(
            <List key={i}>
              {group.instructions.map((instruction, j) => (
                <Instruction
                  key={j}
                  index={j}
                  step={step}
                  onClick={() => handleClick(j)}
                  description={instruction.description}/>
              ))}
            </List>
          )
        }
        else{
          return(
            <div key={i}>
              <SubTitle>{group.title}</SubTitle>
              <List key={i}>
                {group.instructions.map((instruction, j) => (
                  <ListElement key={j}>{instruction.description}</ListElement>
                ))}
              </List>
            </div>
          )
        }
      })}
    </Container>
  )
}

export default Instructions
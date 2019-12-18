import React from 'react'
import styled from 'styled-components'

const Instruction = (props) => {

  const BaseInstruction = styled.li`
    font-size: 25px;
    margin: 5px;

    border-top: 2px solid white;
    border-bottom: 2px solid white;

    &:hover {
      border-top: 2px solid grey;
      border-bottom: 2px solid grey;
    }
  `

  const PastInstruction = styled(BaseInstruction)`
    color: #CCC;
  `

  const CurrentInstruction = styled(BaseInstruction)`
    border-top: 2px solid orange;
    border-bottom: 2px solid orange;
    font-size: 30px;

    &:hover {
      border-top: 2px solid orange;
      border-bottom: 2px solid orange;
    }
  `

  if(props.step > props.index) {
    return(
      <PastInstruction onClick={props.onClick}>
        {props.description}
      </PastInstruction>
    )
  }

  else if(props.step === props.index){
    return(
      <CurrentInstruction onClick={props.onClick}>
        {props.description}
      </CurrentInstruction>
    )
  }
  
  return(
    <BaseInstruction onClick={props.onClick}>
      {props.description}
    </BaseInstruction>
  )
}

export default Instruction

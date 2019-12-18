import React from 'react'
import styled from 'styled-components'

const ARTextField = (props) => {

  const Container = styled.div`
  `

  const FieldTitle = styled.h3`
    padding-left: 10px;
    letter-spacing: .05em;
    margin-bottom: 4px;
    font-size: 20px;
  `

  const Field = styled.input`
    font-family: "montserrat", "Helvetica", Sans-serif;
    width: 100%;
    font-size: 20px;
    padding: 12px 10px;
    border-radius: 5px;
    border: 1px solid black;
    box-sizing: border-box;
  `

  return(
    <Container>
      <FieldTitle>{props.title}</FieldTitle>
      <Field type={props.type} placeholder={props.description}/>
    </Container>
  )
}

export default ARTextField
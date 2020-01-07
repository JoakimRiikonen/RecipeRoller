import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  font-size: 50px;
  font-family: "montserrat", "Helvetica", Sans-serif;
  text-align: center;
  padding-top: 40px;
`

const EmptyPage = (props) => {
  
  return(
    <Container>
      Page not found.
    </Container>
  )
}

export default EmptyPage
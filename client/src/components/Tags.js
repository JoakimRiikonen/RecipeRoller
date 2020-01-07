import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  font-family: "montserrat", "Helvetica", Sans-serif;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
`

const Tag = styled.span`
  color: orange;
  font-weight: bold;
  padding: 5px 15px;
  font-size: 20px;
`

const Tags = (props) => {
  
  console.log(props.tags)

  return(
    <Container>
      {props.tags.map((tag, i) => (
        <Tag key={i}>{tag.name}</Tag>
      ))}
    </Container>
  )
}

export default Tags
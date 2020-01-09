import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
  font-family: "montserrat", "Helvetica", Sans-serif;
  width: 1000px;
  margin: 0 auto;

  @media(max-width: 1000px){
    width: 100%;
  }
`

const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 10px;
`

const Description = styled.p`
  font-size: 20px;
  width: 80%;
  padding-left: 10%;
`

const Link = styled.a`
  font-family: "montserrat", "Verdana", Sans-serif;
  font-weight: bold;
  color: black;
  text-decoration: none;

  transition: color 0.1s;

  &:hover {
    color: orange;
  }
}
`

const About = (props) => {
  return(
    <Container>
      <Title>About</Title>
      <Description>
        Most other recipe websites are abysmal, filled with needless multi-paragraph descriptions and plagued by ads. Because of that I made this website to serve as a personal collection of recipes.
        It also features a random recipe functionality for days when I can't decide what I should eat.
        If you somehow stumbled upon this site, feel free to use it as well.
      </Description>
      <Description>
        Made by Joakim Riikonen.
      </Description>
      <Description>
        <Link href="https://github.com/JoakimRiikonen/RecipeRoller">Project Github</Link>
      </Description>
    </Container>
  )
}

export default About
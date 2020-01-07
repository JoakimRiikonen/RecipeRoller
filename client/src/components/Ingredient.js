import React, { useState } from 'react'
import styled from'styled-components'

const Ingredient = (props) => {

  const [checked, setChecked] = useState(false)

  const Container = styled.div`
    display: flex;
  `

  const BaseIngredient = styled.li`
    font-size: 25px;
    display: flex;
    padding: 4px;
    padding-left: 15px;
  `

  const CheckedIngredient = styled(BaseIngredient)`
    color: #CCC;
  `

  const IconContainer = styled.div`
    display: inline-block;
    width: 25px;
    height: 25px;
    padding-top: 7px;
  `

  const Icon = styled.svg`
    fill: none;
    stroke-width: 2px;

    ${Container}:hover & {
      stroke: grey;
    }
  `

  const OrangeIcon = styled(Icon)`
    stroke: orange;

    ${Container}:hover & {
      stroke: orange;
    }
  `

  if(checked) return (
    <Container>
      <IconContainer onClick={() => setChecked(!checked)}>
        <OrangeIcon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
        </OrangeIcon>
      </IconContainer>
      <CheckedIngredient onClick={() => setChecked(!checked)}>
        {props.name}
      </CheckedIngredient>
    </Container>
  )

  return(
    <Container>
      <IconContainer onClick={() => setChecked(!checked)}>
        <Icon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
        </Icon>
      </IconContainer>
      <BaseIngredient onClick={() => setChecked(!checked)}>
        {props.name}
      </BaseIngredient>
    </Container>
  )
}

export default Ingredient
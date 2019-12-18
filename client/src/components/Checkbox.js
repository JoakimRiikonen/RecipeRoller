import React, { useState } from 'react'
import styled from 'styled-components'

//HEAVILY WIP

const Checkbox = (props) => {

  const [checked, setChecked] = useState(false)

  const handleCheckboxChange = (event) => {
    this.setChecked(event.target.checked)
  }

  const CheckboxContainer = styled.div`
    display: inline-block;
    padding: 7px;
    vertical-align: middle;
  `

  const HiddenCheckbox = styled.input.attrs({ type: 'checkbox'})`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  `

  const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 2px;
  `

  const StyledCheckbox = styled.div`
    display: inline-block;
    width: 16px;
    height: 16px;
    background: ${props => props.checked ? 'salmon' : 'papayawhip'}
    border-radius: 3px;
    transition: all 150ms;

    ${Icon} {
      visibility: ${props => props.checked ? 'visible' : 'hidden'}
    }
  `

  /* <CheckboxContainer className={className}>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked} />
    </CheckboxContainer> */

  return(
    <CheckboxContainer>
      <HiddenCheckbox checked={checked}/>
      <StyledCheckbox checked={checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  )
}

export default Checkbox
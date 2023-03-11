import styled from 'styled-components'

export const Typografy = styled.p`
  font-size: ${(props) => props.size}px;
  text-align: ${(props) => (props.center ? 'center' : undefined)};
  color: ${(props) => props.color || 'black'};
  margin: 0px;
  padding: 0px;
`

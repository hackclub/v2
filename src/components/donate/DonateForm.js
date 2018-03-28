import React from 'react'
import {
  Button,
  Box,
  Text,
  Input,
  Heading,
  Flex,
  Icon
} from '@hackclub/design-system'

const Secure = Flex.extend`
  position: absolute;
  top: 0;
  right: 0;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
`

const amounts = [5, 10, 25, 50, 100, 200, 250]

const AmountsGrid = Box.extend`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${props => props.theme.space[3]}px;
  input[type='radio'] {
    display: none;
    &:checked + label {
      background-color: ${props => props.theme.colors.blue[7]} !important;
    }
  }
  input[type='number'] {
    text-align: center;
    grid-column: 2 / span 2;
  }
`

const Amount = Button.withComponent('label').extend`
  border-radius: ${props => props.theme.radius};
`

const Option = ({ amount, ...props }) => [
  <input
    type="radio"
    id={`amount[${amount}]`}
    name="amount"
    value={amount}
    key={`input[${amount}]`}
  />,
  <Amount bg="info" for={`amount[${amount}]`} key={`label[${amount}]`}>
    <Text.span>${amount}</Text.span>
  </Amount>
]

const InnerForm = () => (
  <Box align="center" style={{ position: 'relative' }}>
    <Secure p={2} mr={[-3, -4]}>
      <Text f={0} color="red.1" caps bold>
        Secure
      </Text>
      <Icon size={16} name="lock" color="red.1" ml={2} />
    </Secure>
    <Heading.h2
      mx={[-3, -4]}
      mt={[-3, -4]}
      mb={3}
      pt={4}
      pb={3}
      px={3}
      f={5}
      bg="primary"
      color="white"
    >
      Become a Patron
    </Heading.h2>
    <Text color="black" f={3} mb={3}>
      Select an amount
    </Text>
    <AmountsGrid w={1}>
      {amounts.map(amount => <Option amount={amount} key={amount} />)}
      <Input type="number" placeholder="Other" />
    </AmountsGrid>
  </Box>
)

export default InnerForm

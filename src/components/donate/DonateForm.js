import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Box,
  LargeButton,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  Label,
  Text,
  theme
} from '@hackclub/design-system'
import { PUBLIC_STRIPE_KEY } from 'constants.js'
import { toNumber } from 'lodash'
import api from 'api'

const Secure = styled(Flex)`
  position: absolute;
  top: 0;
  right: 0;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
`

const amounts = [10, 20, 40, 100]

const AmountsGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${theme.space[3]}px;
  input[type='radio'] {
    display: none;
    &:checked + label {
      background-color: ${theme.colors.blue[7]} !important;
    }
  }
  input[type='number'] {
    text-align: center;
    border-radius: ${theme.pill};
    grid-column: 2 / span 2;
  }
`

const Amount = styled(Button.withComponent('label'))``

const Option = ({ amount, ...props }) => [
  <input
    type="radio"
    id={`amount[${amount}]`}
    name="amount"
    value={amount}
    key={`input[${amount}]`}
    {...props}
  />,
  <Amount bg="info" htmlFor={`amount[${amount}]`} key={`label[${amount}]`}>
    <Text.span>${amount}</Text.span>
  </Amount>
]

const Other = styled(Input)`
  color: ${theme.colors.black};
  &::placeholder {
    color: ${theme.colors.muted};
  }
`

class DonateForm extends Component {
  state = {
    loading: true,
    stripeLoading: true,
    amount: 20,
    recurring: true
  }

  componentWillUnmount() {
    if (this.stripeHandler) {
      this.stripeHandler.close()
    }
  }

  render() {
    const { recurring } = this.state
    return (
      <Box align="center" style={{ position: 'relative' }}>
        <Box bg="primary" color="white" mx={[-3, -4]} pb={4} mb={3}>
          <Secure p={2} mr={[-3, -4]}>
            <Text fontSize={0} color="red.1" caps bold>
              Secure
            </Text>
            <Icon size={16} glyph="private" color="red.1" ml={2} />
          </Secure>
          <Heading.h2 mt={[-3, -4]} pt={4} px={3} fontSize={5}>
            Become a patron
          </Heading.h2>
          <Text color="snow" mt={1} fontSize={1}>
            Just $3 supports a student for a month
          </Text>
        </Box>
        <Flex align="center" justify="center" color="black">
          <Text fontSize={3} bold>
            Select an amount
          </Text>
          <Text.span mx={[1, 2]} children="—" />
          <Label>
            <input
              name="recurring"
              type="checkbox"
              style={{
                WebkitAppearance: 'checkbox',
                MozAppearance: 'checkbox',
                appearance: 'checkbox'
              }}
              checked={recurring}
              onChange={this.handleRecurringChange}
            />
            <Text.span fontSize={2} ml={1}>
              monthly?
            </Text.span>
          </Label>
        </Flex>
        <AmountsGrid width={1} mt={3} mb={4}>
          {amounts.map(amount => (
            <Option
              amount={amount}
              onChange={e => this.handleAmountChange(amount)}
              key={amount}
            />
          ))}
          <Other
            type="number"
            placeholder="Other"
            onChange={e => this.handleAmountChange(e.target.value)}
          />
        </AmountsGrid>
        <Text color="slate" mb={3} fontSize={1}>
          Our recommended donation is $20/month
        </Text>
        <LargeButton
          onClick={e => this.startStripe(e)}
          children={this.buttonText()}
          width={1}
        />
      </Box>
    )
  }

  loadStripe = onload => {
    if (!window.StripeCheckout) {
      const script = document.createElement('script')
      script.onload = () => {
        onload()
      }
      script.src = 'https://checkout.stripe.com/checkout.js'
      document.head.appendChild(script)
    } else {
      onload()
    }
  }

  startStripe = e => {
    this.loadStripe(() => {
      this.stripeHandler = window.StripeCheckout.configure({
        key: PUBLIC_STRIPE_KEY,
        image: 'https://hackclub.com/twitter-avatar.png',
        locale: 'auto',
        amount: this.amountInCents(),
        token: this.handleToken
      })

      this.setState({
        stripeLoading: false,
        // loading needs to be explicitly set false so component will render in 'loaded' state.
        loading: false
      })

      this.onStripeUpdate(e)
    })
  }

  onStripeUpdate = e => {
    this.stripeHandler.open({
      name: 'Hack Club',
      description: this.state.recurring
        ? 'Monthly contribution to Hack Club'
        : 'One-time contribution to Hack Club',
      panelLabel: this.state.recurring
        ? 'Donate {{amount}} monthly'
        : 'Donate {{amount}}',
      allowRememberMe: false
    })

    e.preventDefault()
  }

  handleToken = token => {
    this.setState({ loading: true })

    const data = new FormData()

    data.append('stripe_email', token.email)
    data.append('stripe_token', token.id)
    data.append('recurring', this.state.recurring)
    data.append('amount', this.amountInCents())

    this.setState({ status: 'loading' })

    api
      .post('v1/donations', { data })
      .then(data => {
        if (data.donation_successful) {
          this.setState({ status: 'done' })
        } else {
          this.setState({ status: 'error' })
        }
      })
      .catch(() => {
        this.setState({ status: 'error' })
      })
  }

  handleAmountChange = a => {
    const amount = toNumber(a || 1)
    this.setState({ amount })
  }

  handleRecurringChange = v => {
    this.setState({ recurring: v.target.checked })
  }

  buttonText() {
    switch (this.state.status) {
      case 'done':
        return 'Thank you 😊'
      case 'loading':
        return 'One moment…'
      case 'error':
        return 'Something went wrong!'
      default:
        const msg = `Donate $${this.state.amount}`
        return this.state.recurring ? `${msg} a month` : msg
    }
  }
  setAmount = amount => v => {
    this.setState({ amount, custom: false })
  }
  amountInCents = () => this.state.amount * 100
}
export default DonateForm

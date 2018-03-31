import React, { Component } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  Label,
  Text
} from '@hackclub/design-system'
import { toNumber } from 'lodash'

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
    {...props}
  />,
  <Amount bg="info" htmlFor={`amount[${amount}]`} key={`label[${amount}]`}>
    <Text.span>${amount}</Text.span>
  </Amount>
]

class DonateForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      stripeLoading: true,
      amount: 10,
      recurring: true
    }

    // Have to bind our handlers to this because of how JavaScript's scope works.
    this.onStripeUpdate = this.onStripeUpdate.bind(this)
    this.startStripe = this.startStripe.bind(this)
    this.loadStripe = this.loadStripe.bind(this)
    this.handleToken = this.handleToken.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.handleRecurringChange = this.handleRecurringChange.bind(this)
  }

  componentWillUnmount() {
    if (this.stripeHandler) {
      this.stripeHandler.close()
    }
  }

  render() {
    const { custom, recurring, amount } = this.state
    return (
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
        <Flex align="center" justify="center" color="black">
          <Text f={3} bold>
            Select an amount
          </Text>
          <Text.span mx={2} children="—" />
          <input
            name="recurring"
            type="checkbox"
            checked={recurring}
            onChange={this.handleRecurringChange}
          />
          <Label htmlFor="recurring" f={2} ml={1}>
            monthly?
          </Label>
        </Flex>
        <AmountsGrid w={1} mt={3} mb={4}>
          {amounts.map(amount => (
            <Option
              amount={amount}
              onChange={e => this.handleAmountChange(amount)}
              key={amount}
            />
          ))}
          <Input
            type="number"
            placeholder="Other"
            onChange={e => this.handleAmountChange(e.target.value)}
            color="black"
          />
        </AmountsGrid>
        <Button
          onClick={e => this.startStripe(e)}
          children={this.buttonText()}
          w={1}
        />
      </Box>
    )
  }

  loadStripe(onload) {
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

  startStripe(e) {
    this.loadStripe(() => {
      this.stripeHandler = window.StripeCheckout.configure({
        key: process.env.STRIPE_PUBLISHABLE_KEY,
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

  onStripeUpdate(e) {
    this.stripeHandler.open({
      name: 'Hack Club',
      description: 'Hack Club contribution.',
      panelLabel: 'Donate',
      allowRememberMe: false
    })

    e.preventDefault()
  }

  handleToken(token) {
    this.setState({ loading: true })

    var data = new FormData()

    data.append('stripe_email', token.email)
    data.append('stripe_token', token.id)
    data.append('recurring', this.state.recurring)
    data.append('amount', this.amountInCents())

    this.setState({ status: 'loading' })

    api
      .post('/v1/donations', { data })
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

  handleAmountChange(a) {
    const amount = toNumber(a || 1)
    this.setState({ amount })
  }

  handleRecurringChange(v) {
    this.setState({ recurring: v.target.checked })
  }

  buttonText() {
    switch (this.state.status) {
      case 'done':
        return 'Sent! Thank you for your contriution'
      case 'loading':
        return 'One moment…'
      case 'error':
        return 'Something went wrong!'
      default:
        const msg = `Donate $${this.state.amount}`
        return this.state.recurring ? `${msg} a month` : msg
    }
  }

  setAmount(amount) {
    return v => {
      this.setState({ amount, custom: false })
    }
  }

  amountInCents() {
    return this.state.amount * 100
  }
}

export default DonateForm

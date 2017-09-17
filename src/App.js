import React from 'react'
import {
  Provider,
  Banner,
  Heading,
  Badge,
  Lead,
  Container,
  Flex,
  Box,
  Text,
  Subhead,
  Button,
  ButtonOutline,
  Label,
  Input,
  Tabs,
  TabItem,
  Relative,
  Absolute,
  Image
} from 'rebass'
import Bar from './Bar'
import theme, { brand, grays } from './theme'
import { keys } from 'lodash'

const Flag = Image.extend`
  top: 0;
  left: 0;
  position: absolute;
  max-width: 14rem;
  padding-left: 1rem;
  z-index: 0;
`

const Hero = Banner.extend`background: ${brand.primary} url('geo.svg') repeat;`

const HeroContainer = Container.extend`
  max-width: 48rem;
  padding: 0;
  text-align: center;
  z-index: 1;
`

const Swatch = Flex.extend.attrs({
  m: 2,
  p: 4,
  column: true,
  align: 'center',
  justify: 'center'
})`
  width: 8rem;
  height: 8rem;
  border-radius: 4px;
`

const App = () => (
  <Provider theme={theme}>
    <Hero bg="primary" py={6} px={2}>
      <Flag src="https://cdn.rawgit.com/hackclub/hackclub/629b7921/internals/logos/banner_orpheus_hand.svg" />
      <HeroContainer
        style={{ maxWidth: 48 * 16, textAlign: 'center', zIndex: 2 }}
      >
        <Heading f={[5, 6, 7]} my={0} color="white">
          Start an amazing coding club at your high school.
        </Heading>
        <Lead
          f={[3, 4]}
          color="snow"
          mt={3}
          mb={4}
          mx="auto"
          w={[1, 2 / 3]}
          style={{ lineHeight: 1.6 }}
        >
          Hack Club is the largest nonprofit network of student-led high school
          coding clubs.
        </Lead>
        <Flex justify="center" wrap>
          <Button bg="white" color="primary" f={4}>
            Start a Club
          </Button>
          <ButtonOutline bg="primary" color="white" f={4} ml={3}>
            Donate
          </ButtonOutline>
        </Flex>
      </HeroContainer>
    </Hero>
    <Container py={4} color="black" style={{ maxWidth: 56 * 16 }}>
      <Bar w={1 / 3} mt={0} mb={4} />
      <Heading mt={3}>Colors</Heading>
      <Text>These are Hack Club's colors.</Text>
      <Flex mx={-2} mt={3} mb={4} wrap>
        {keys({ ...brand, ...grays }).map(key => (
          <Swatch
            key={key}
            bg={key}
            color={['white', 'snow', 'smoke'].includes(key) ? 'black' : 'white'}
          >
            <Text f={2} bold>
              {key}
            </Text>
            <Text f={0}>{theme.colors[key]}</Text>
          </Swatch>
        ))}
      </Flex>
      <Bar w={1 / 3} my={4} />
      <Heading mt={4}>Elements</Heading>
      <Subhead mt={4} mb={2}>
        Buttons
      </Subhead>
      <Flex wrap>
        <Button bg="primary" mr={2}>
          Primary
        </Button>
        <ButtonOutline color="muted" mr={2}>
          Muted
        </ButtonOutline>
      </Flex>
      {/* <Subhead mt={4} mb={2}>
        Forms
      </Subhead>
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Zach Latta" /> */}
      <Subhead mt={4} mb={2}>
        Tabs
      </Subhead>
      <Tabs w={1 / 3}>
        <TabItem active>Zach</TabItem>
        <TabItem>Max</TabItem>
        <TabItem>Harrison</TabItem>
      </Tabs>
      <Bar w={1 / 3} />
    </Container>
  </Provider>
)

export default App

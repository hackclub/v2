import React from 'react'
import styled from 'styled-components'
import {
  Section,
  Heading,
  Text,
  Container,
  theme
} from '@hackclub/design-system'
import Layout from 'components/Layout'
import Nav from 'components/Nav'
import Name from 'components/Name'
import Bio from 'components/Bio'
import Footer from 'components/Footer'

const Header = styled(Section)`
  background: url('/pattern.svg'), ${theme.gradient('warning', 'primary')};
  background-repeat: repeat;
`

const Base = styled(Container)`
  display: grid;
  grid-gap: 1rem;
  ${theme.mediaQueries.md} {
    grid-gap: 2rem;
    grid-template-columns: repeat(2, 1fr);
  }
`

const title = 'Team – Hack Club'
const desc =
  'Meet the team that runs Hack Club, a global nonprofit network of high school computer science clubs.'

export default () => (
  <Layout bg="snow" title={title} desc={desc} path="/team/">
    <Nav />
    <Header color="white">
      <Container maxWidth={36} align="center" py={[3, 4]}>
        <Heading.h1 fontSize={[3, 4]} regular caps mt={5} mb={2}>
          Hack Club Team
        </Heading.h1>
        <Name fontSize={6}>We the students.</Name>
        <Text fontSize={3} my={3}>
          We believe in a world where every young person is empowered to be the
          change they want to see around them. At Hack Club, we’re working hard
          to make it reality.
        </Text>
      </Container>
    </Header>
    <Base px={3} py={[4, 5]}>
      <Bio
        img="/team/zach.jpg"
        name="Zach Latta"
        teamRole="Founder"
        text="Zach dropped out of high school after his freshman year to work in the technology industry and had over 5 million people using his software by the time he turned 17. He founded Hack Club to build the program he wish he had in high school and has been awarded the Thiel Fellowship and Forbes 30 Under 30 for his work."
        pronouns="he/him"
      />
      <Bio
        img="/team/max.jpg"
        name="Max Wofford"
        teamRole="Operations"
        text="After teaching himself to code in junior year of high school, Max joined a group of nomadic hackers in Costa Rica to experience coding in a real-world setting. He has been with Hack Club since day one and is now working full-time in San Francisco to grow the movement."
        pronouns="he/him"
      />
      <Bio
        img="/team/lachlan.jpg"
        name="Lachlan Campbell"
        teamRole="Web/Design"
        text="Lachlan, an active club leader from State College, PA, joined to work on hackclub.com. 1.5 years later, they make Hack Club’s website, design (system), & branding, and work on projects including Bank & Leaders. They will soon study Interactive Media Arts @ NYU, fall 2019."
        pronouns="they/them"
      />
      <Bio
        img="/team/mingjie.jpg"
        name="Mingjie Jiang"
        teamRole="Community"
        text="Mingjie is a club leader from Rockville, Maryland. He started working with Hack Club in July 2017, currently working with community engagement and public identity of the organization. He also ran various programs like Hack Chicago & CodeDay DC to spread his passion for technology to fellow students."
        pronouns="he/him"
      />
      <Bio
        img="/team/chris.jpg"
        name="Chris Walker"
        teamRole="Hacker Resources"
        text="Chris started programming games in middle school, a hobby that developed into a deep passion for educational software. In 2013 he accepted a Thiel Fellowship and moved to San Francisco, where he watched Hack Club grow from an early stage. He now works full-time on Hack Club’s learning resources."
        pronouns="he/him"
      />
      <Bio
        img="/team/athul.jpg"
        name="Athul Blesson"
        teamRole="Indian Region"
        text="Athul leads some of the largest Hack Clubs in India. After graduating from high school, he joined as the Regional Manager in India, where he actively leads 30+ clubs."
        pronouns="he/him"
      />
      <Bio
        img="/team/michael.jpg"
        name="Michael Destefanis"
        teamRole="Hack Club Bank"
        text="After graduating high school, Michael moved to California where he began working with Hack Club. He now leads Hack Club Bank and loves helping passionate people bring their ideas to reality."
        pronouns="he/him"
      />
      <Bio
        img="/team/linus.jpg"
        name="Linus Lee"
        teamRole="Hack Club Bank"
        text="Linus spends most of his free time working on side projects ranging from an audio travel diary to creative coding tools to his own programming language. He brings his experience in product and community from Cal Hacks and Dorm Room Fund to grow Hack Club Bank into the platform he wishes he had when he was in high school."
        pronouns="he/him"
      />
      <Bio
        img="/team/theo.jpg"
        name="Theo Bleier"
        teamRole="Hack Club Bank"
        text="Theo is a sophomore in high school & joined the Hack Club community in Summer 2018 after reading about Bank online. Since then, he's run multiple events on it & is now working on the product as a software engineer."
        pronouns="he/him"
      />
    </Base>
    <Footer />
  </Layout>
)

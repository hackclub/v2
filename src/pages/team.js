import React from 'react'
import styled from 'styled-components'
import { Section, Box, Container, theme } from '@hackclub/design-system'
import Layout from 'components/Layout'
import Nav from 'components/Nav'
import { Title, Headline, Lead } from 'components/Content'
import Bio from 'components/Bio'
import Footer from 'components/Footer'

const Header = styled(Section)`
  background: ${theme.gradient('cyan.6', 'cyan.8')};
`

const Base = styled(Box.section)`
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
    <Header bg="cyan.9">
      <Container pt={[5, 6]} pb={[3, 4]}>
        <Container align="left" mx={0} maxWidth={42}>
          <Title mt={5} mb={2}>
            By the students, for&nbsp;the students.
          </Title>
          <Lead color="cyan.0" my={3}>
            We believe in a world where every young person is empowered to be
            the change they want to see around them. At Hack Club, we’re working
            hard to make it reality.
          </Lead>
        </Container>
      </Container>
    </Header>
    <Container>
      <Base my={[4, 5]}>
        <Bio
          name="Zach Latta"
          teamRole="Founder"
          text="Zach dropped out of high school after his freshman year to work in the technology industry and had over 5 million people using his software by the time he turned 17. He founded Hack Club to build the program he wish he had in high school and has been awarded the Thiel Fellowship and Forbes 30 Under 30 for his work."
          pronouns="he/him"
        />
        <Bio
          name="Max Wofford"
          teamRole="Operations"
          text="After teaching himself to code in junior year of high school, Max joined a group of nomadic hackers in Costa Rica to experience coding in a real-world setting. He has been with Hack Club since day one and is now working full-time in San Francisco to grow the movement."
          pronouns="he/him"
        />
        <Bio
          name="Christina Asquith"
          teamRole="COO"
          text="Christina is founder & former editor-in-chief of Fuller Project, a global journalism nonprofit reporting on issues impacting women. A journalist since college, she’s reported from eight countries for the New York Times, Guardian, TIME, the Washington Post & others. She taught as a public school teacher in 2000, which inspired her book “The Emergency Teacher.”"
          pronouns="she/her"
        />
        <Bio
          name="Lachlan Campbell"
          teamRole="Storytelling"
          text="Lachlan joined as a club leader from State College, PA to make hackclub.com. 3 years later, as Head of Storytelling, they work on Hack Club’s website, design (system), open source, & communications. They previously designed Hack Club Bank. They also study Interactive Media Arts @ NYU, class of 2023."
          pronouns="they/them"
        />
        <Bio
          name="Chris Walker"
          teamRole="Hacker Resources"
          text="Chris started programming games in middle school, a hobby that developed into a deep passion for educational software. In 2013 he accepted a Thiel Fellowship and moved to San Francisco, where he watched Hack Club grow from an early stage. He now works full-time on Hack Club’s learning resources."
          pronouns="he/him"
        />
        <Bio
          name="Matthew Stanciu"
          teamRole="Clubs"
          text="After leading a successful club in West Lafayette, Indiana, & organizing multiple hackathons with Hack Club Bank, Matthew joined the team to work with clubs around the world. He now writes Hack Club’s curriculum & recently drove across North America to visit clubs."
          pronouns="he/him"
        />
        <Bio
          name="Theo Bleier"
          teamRole="Hack Club Bank"
          text="Theo is a sophomore in high school & joined the Hack Club community in Summer 2018 after reading about Bank online. Since then, he's run multiple events on it & is now working on the product as a software engineer."
          pronouns="he/him"
        />
        <Bio
          name="Michael Destefanis"
          teamRole="Hack Club Bank"
          text="After graduating high school, Michael moved to California where he began working with Hack Club. He now leads Hack Club Bank and loves helping passionate people bring their ideas to reality."
          pronouns="he/him"
        />
        <Bio
          img="/team/athul.jpg"
          name="Athul Blesson"
          teamRole="Indian Region"
          text="Athul leads some of the largest Hack Clubs in India. After graduating from high school, he joined as the Regional Manager in India, where he actively leads 30+ clubs."
          pronouns="he/him"
        />
      </Base>
      <Headline color="cyan.7" mt={[4, 5, 6]} mb={[3, 4]} pl={[3, 0]}>
        Acknowledgements
      </Headline>
      <Base mb={[4, 5]}>
        <Bio
          img="/camp/mingjie.jpg"
          name="Mingjie Jiang"
          teamRole="Community"
          text="Mingjie started working with Hack Club in July 2017, while leading his club in Rockville, Maryland, working on community engagement & public identity. He’s also run Hack Chicago, CodeDay, and countless other hackathons to spread his passion for technology."
          pronouns="he/him"
        />
        <Bio
          img="/team/linus.jpg"
          name="Linus Lee"
          teamRole="Hack Club Bank"
          text="Linus spends most of his free time working on side projects ranging from an audio travel diary to creative coding tools to his own programming language. He brought his experience in product & community from Cal Hacks & Dorm Room Fund to grow Hack Club Bank."
          pronouns="he/him"
        />
        <Bio
          img="/camp/fernanda.jpg"
          name="Fernanda Lozano"
          teamRole="Flagship"
          text="Fernanda is a student of computational neuroscience, entrepreneur, & organizer of events like the Entrepreneurial Learning Academy for students in Mexico. In summer 2019, she helped organize the Flagship Summit in San Francisco."
          pronouns="she/her"
        />
      </Base>
    </Container>
    <Footer />
  </Layout>
)

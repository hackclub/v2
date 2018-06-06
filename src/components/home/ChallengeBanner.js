import React from 'react'
import {
  Card,
  Box,
  Text,
  Icon,
  Container,
  Flex,
  Link
} from '@hackclub/design-system'

export default () => (
  <Container maxWidth={38}>
    <Link href="challenge">
      <Card bg="blue.1" p={[2, 3]} mt={-2} mb={4}>
        <Flex justify="flex-start">
          <Icon name="open_in_new" size={48} mr={[2, 3]} color="blue.6" />
          <Box color="blue.6">
            <Text f={3} bold>
              Check out the winning challenge submissions
            </Text>
            <Text f={2}>
              Our latest challenge just wrapped up. See the winning projects.
            </Text>
          </Box>
        </Flex>
      </Card>
    </Link>
  </Container>
)

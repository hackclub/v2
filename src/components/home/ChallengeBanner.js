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
  <Container maxWidth={24} my={-3}>
    <Link href="challenge">
      <Card bg="blue.1" p={[2, 3]}>
        <Flex justify="flex-start" align="center">
          <Icon name="open_in_new" size={24} mr={[2, 3]} color="blue.6" />
          <Box color="blue.6">
            <Text f={3} bold>
              Check out student-built projects
            </Text>
          </Box>
        </Flex>
      </Card>
    </Link>
  </Container>
)

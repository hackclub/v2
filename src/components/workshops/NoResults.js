import React from 'react'
import { Box, Text } from '@hackclub/design-system'

export default ({ value }) => (
  <Box align="center" px={4} pt={[5, 6]} pb={[6, 7, 8]}>
    <Text color="slate" fontSize={[3, 4]}>
      No results found {value && `for “${value}”`}
    </Text>
  </Box>
)

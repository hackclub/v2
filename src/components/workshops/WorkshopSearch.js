import React, { useState } from 'react'
import { Container } from '@hackclub/design-system'
import SearchInput from './search/SearchInput'
import Track from './search/Track'
import NoResults from './search/NoResults'
import Fuse from 'fuse.js'
import { groupBy, toPairs } from 'lodash'

const groupOrder = [
  'start',
  'club',
  'challenges',
  'pi',
  'react',
  'arduino',
  'experimental',
  'misc',
  'retired'
]
const keys = ['node.frontmatter.name', 'node.frontmatter.description']

export default ({ workshops }) => {
  // state and setters for ...
  // value
  const [value, setValue] = useState('')
  const handleInputChange = e => setValue(e.target.value)

  // fuse instance
  const fuse = new Fuse(workshops, { threshold: 0.4, keys })

  // fuse search
  const results = value === '' ? workshops : fuse.search(value)
  const grouped = groupBy(results, 'node.frontmatter.group')

  // sort groups based on groupOrder
  const groups = toPairs(grouped).sort((a, b) => {
    // if a group isn't found in groupOrder, ensure it appears last in the
    // sorted list
    if (groupOrder.indexOf(a[0]) === -1) {
      return 1
    } else if (groupOrder.indexOf(b[0]) === -1) {
      return -1
    }

    return groupOrder.indexOf(a[0]) - groupOrder.indexOf(b[0])
  })

  return (
    <>
      <Container maxWidth={48} mt={-36} px={3} style={{ zIndex: 2 }}>
        <SearchInput
          placeholder="Search workshops"
          label="Search"
          value={value}
          onChange={handleInputChange}
        />
      </Container>
      {groups.length !== 0 ? (
        <>
          {groups.map(group => (
            <Track
              key={`workshops-${group[0]}`}
              name={group[0]}
              data={group[1]}
            />
          ))}
        </>
      ) : (
        <NoResults value={value} />
      )}
    </>
  )
}

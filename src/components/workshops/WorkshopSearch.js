import React, { Component, Fragment } from 'react'
import { Container } from '@hackclub/design-system'
import SearchInput from './SearchInput'
import Track from './Track'
import NoResults from './NoResults'
import Fuse from 'fuse.js'
import { groupBy, toPairs } from 'lodash'

const groupOrder = [
  'start',
  'club',
  'challenges',
  'pi',
  'arduino',
  'experimental',
  'misc',
  'retired'
]
const keys = ['node.frontmatter.name', 'node.frontmatter.description']

class WorkshopSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.fuse = new Fuse(props.workshops, { threshold: 0.4, keys })
  }

  handleInputChange = e => this.setState({ value: e.target.value })

  render() {
    const results =
      this.state.value === ''
        ? this.props.workshops
        : this.fuse.search(this.state.value)
    const groups = groupBy(results, 'node.frontmatter.group')

    // sort groups based on groupOrder
    const sortedGroups = toPairs(groups).sort((a, b) => {
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
      <Fragment>
        <Container maxWidth={48} mt={-4} px={3} style={{ zIndex: 2 }}>
          <SearchInput
            placeholder="Search workshops"
            label="Search"
            value={this.state.value}
            onChange={this.handleInputChange}
          />
        </Container>
        {results.length !== 0 ? (
          <Fragment>
            {sortedGroups.map(group => (
              <Track
                key={`workshops-${group[0]}`}
                name={group[0]}
                data={group[1]}
              />
            ))}
          </Fragment>
        ) : (
          <NoResults value={this.state.value} />
        )}
      </Fragment>
    )
  }
}

export default WorkshopSearch

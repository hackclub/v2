import React, { Component } from 'react'
import SearchInput from './SearchInput'
import Track from './Track'
import NoResults from './NoResults'
import Fuse from 'fuse.js'
import { groupBy, toPairs } from 'lodash'

const groupOrder = [
  'start',
  'challenges',
  'pi',
  'arduino',
  'experimental',
  'misc',
  'retired'
]
const keys = ['node.frontmatter.name', 'node.frontmatter.description']

class WorkshopSearch extends Component {
  state = {
    inputValue: ''
  }

  handleInputChange = event => this.setState({ inputValue: event.target.value })

  render() {
    const fuse = new Fuse(this.props.workshops, { threshold: 0.4, keys: keys })
    const results =
      this.state.inputValue === ''
        ? this.props.workshops
        : fuse.search(this.state.inputValue)
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
      <div>
        <SearchInput
          placeholder="Search workshops"
          label="Search"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          mb={5}
        />
        {results.length !== 0 ? (
          <div>
            {sortedGroups.map(group => (
              <Track
                key={`workshops-${group[0]}`}
                name={group[0]}
                data={group[1]}
              />
            ))}
          </div>
        ) : (
          <NoResults value={this.state.inputValue} />
        )}
      </div>
    )
  }
}

export default WorkshopSearch

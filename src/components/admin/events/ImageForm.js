import React, { Component, Fragment } from 'react'
import { Box as B, Button } from '@hackclub/design-system'
import PropTypes from 'prop-types'
import api from 'api'
import storage from 'storage'

const Label = Button.withComponent('label')

const Box = B.extend`
  height: ${props => props.height};
  background-size: cover;
  background-image: url(${props => props.imageurl});
`

class ImageForm extends Component {
  constructor(props) {
    super(props)

    this.state = { image: this.props.image }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const authToken = storage.get('authToken')
    const data = new FormData()
    const updatedImage = e.target.files[0]
    this.setState({ image: updatedImage })

    data.append('file', updatedImage)
    data.append('type', `event_${this.props.name}`)
    api.post('v1/attachments', { authToken, data }).then(resp => {
      this.props.updateEvent({ [`${this.props.name}`]: resp.id })
    })
  }

  render() {
    const { name, width, height } = this.props
    const { image } = this.state
    return (
      <form>
        <input
          onChange={this.handleChange}
          id={name}
          type="file"
          accept=".jpg, .jpeg, .png"
          style={{ display: 'none' }}
        />
        <Label htmlFor={name}>
          {image ? 'Reupload' : 'Upload'} {name}
        </Label>
        {image && (
          <Fragment>
            <Box
              imageurl={
                this.props.image
                  ? `https://api.hackclub.com/${image.file_path}`
                  : URL.createObjectURL(image)
              }
              width={width}
              height={height}
            />
          </Fragment>
        )}
      </form>
    )
  }
}

ImageForm.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  updateEvent: PropTypes.func.isRequired
}

export default ImageForm

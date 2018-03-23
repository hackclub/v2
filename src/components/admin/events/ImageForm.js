import React, { Component, Fragment } from 'react'
import { Button } from '@hackclub/design-system'
import PropTypes from 'prop-types'
import api from 'api'
import storage from 'storage'

const Label = Button.withComponent('label')

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
    const { name, width, height, previewTag: PreviewTag } = this.props
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
          <PreviewTag
            imageUrl={
              this.props.image
                ? `https://api.hackclub.com/${image.file_path}`
                : URL.createObjectURL(image)
            }
          />
        )}
      </form>
    )
  }
}

ImageForm.propTypes = {
  name: PropTypes.string.isRequired,
  updateEvent: PropTypes.func.isRequired,
  previewTag: PropTypes.func.isRequired,
}

export default ImageForm

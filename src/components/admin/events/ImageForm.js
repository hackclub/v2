import React, { Component, Fragment } from 'react'
import { Button } from '@hackclub/design-system'
import PropTypes from 'prop-types'
import api from 'api'

const Label = Button.withComponent('label')

class ImageForm extends Component {
  constructor(props) {
    super(props)

    this.state = { image: this.props.image }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const data = new FormData()
    const updatedImage = e.target.files[0]
    this.setState({ image: updatedImage })

    data.append('file', updatedImage)
    data.append('type', `event_${this.props.type}`)
    api.post('v1/attachments', { data }).then(resp => {
      this.props.updateEvent({ [`${this.props.type}`]: resp })
    })
  }

  render() {
    const { type, width, height, previewTag: PreviewTag } = this.props
    const { image } = this.state
    return (
      <form>
        <input
          onChange={this.handleChange}
          id={type}
          type="file"
          accept=".jpg, .jpeg, .png"
          style={{ display: 'none' }}
        />
        <Label htmlFor={type}>
          {image ? 'Reupload' : 'Upload'} {type}
        </Label>
        {image && (
          <PreviewTag
            imageUrl={
              image instanceof File
                ? URL.createObjectURL(image)
                : `https://api.hackclub.com${image.file_path}`
            }
          />
        )}
      </form>
    )
  }
}

ImageForm.propTypes = {
  type: PropTypes.string.isRequired,
  updateEvent: PropTypes.func.isRequired,
  previewTag: PropTypes.func.isRequired
}

export default ImageForm

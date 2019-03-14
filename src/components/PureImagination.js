import React, { useState, useEffect } from 'react'

export default () => {
  const codeword = 'pi'

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    window.document.onkeypress = e => {
      const shouldProgress = e.key === codeword[progress]
      setProgress(shouldProgress ? progress + 1 : 0)
    }
  })

  return progress === codeword.length ? (
    <iframe
      title="pi"
      width={560}
      height={315}
      src="https://www.youtube.com/embed/knIfoQW_mZg?autoplay=1"
      frameborder={0}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ display: 'none' }}
    />
  ) : null
}

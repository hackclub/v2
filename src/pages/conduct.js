import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Container } from '@hackclub/design-system'
import Banner from '@hackclub/banner'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import ReactMarkdown from 'react-markdown'
import MarkdownBody from 'components/MarkdownBody'
import content from 'raw-loader!../../content/CONDUCT.md'

const Body = styled(Container.withComponent(MarkdownBody))``

export default () => (
  <Fragment>
    <Helmet title="Code of Conduct – Hack Club" />
    <Nav color="primary" />
    <Body maxWidth={48} py={[5, 6]} px={3}>
      <ReactMarkdown source={content} escapeHtml={false} />
    </Body>
    <Footer />
  </Fragment>
)

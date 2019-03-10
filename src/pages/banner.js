import React from 'react'
import Layout from 'components/Layout'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Container } from '@hackclub/design-system'
import Banner from '@hackclub/banner'
import Footer from 'components/Footer'
import ReactMarkdown from 'react-markdown'
import MarkdownBody from 'components/MarkdownBody'
import content from 'raw-loader!../../node_modules/@hackclub/banner/README.md'

const Body = styled(Container.withComponent(MarkdownBody))``

export default () => (
  <Layout>
    <Helmet title="@hackclub/banners" />
    <Banner />
    <Body maxWidth={48} py={[4, 5]} px={3}>
      <ReactMarkdown source={content} escapeHtml={false} />
    </Body>
    <Footer />
  </Layout>
)

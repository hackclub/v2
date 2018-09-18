import React from 'react'
import styled from 'styled-components'
import { Flex, Link as A, Text, theme } from '@hackclub/design-system'

export const BreadcrumbList = styled(Flex.withComponent('ol'))`
  font-size: ${theme.fontSizes[3]}px;
  font-weight: bold;
  line-height: 1.25;
  list-style: none;
  padding-left: 0;
  text-transform: uppercase;
`
export const Breadcrumbs = props => (
  <BreadcrumbList
    itemScope
    itemType="http://schema.org/BreadcrumbList"
    {...props}
  />
)
export const Breadcrumb = ({ type = 'Thing', position, name, ...props }) => (
  <li
    itemProp="itemListElement"
    itemScope
    itemType="http://schema.org/ListItem"
  >
    <A.link
      itemScope
      itemType={`http://schema.org/${type}`}
      itemProp="item"
      color="inherit"
      {...props}
    >
      <span itemProp="name" children={name} />
    </A.link>
    <meta itemProp="position" content={position} />
  </li>
)
export const BreadcrumbDivider = () => (
  <Text.span mx={2} color="snow" fontSize={3} children="›" />
)

import React from 'react'
import styled from 'styled-components'
import { Flex, Icon, Link as A, Text, theme } from '@hackclub/design-system'

export const BreadcrumbList = styled(Flex.withComponent('ol'))`
  font-size: ${theme.fontSizes[2]}px;
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
  <Icon glyph="view-forward" size={28} color="muted" mx={1} />
)

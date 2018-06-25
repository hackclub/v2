import React from 'react'
import { Flex, Link as A, Text } from '@hackclub/design-system'

export const BreadcrumbList = Flex.withComponent('ol').extend`
  line-height: 1.25;
  list-style: none;
  padding-left: 0;
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
      f={3}
      bold
      caps
      {...props}
    >
      <span itemProp="name" children={name} />
    </A.link>
    <meta itemProp="position" content={position} />
  </li>
)
export const BreadcrumbDivider = () => (
  <Text.span mx={2} color="snow" f={3} children="›" />
)

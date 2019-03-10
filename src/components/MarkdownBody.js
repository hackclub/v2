import styled from 'styled-components'
import { Box, theme } from '@hackclub/design-system'
import { range } from 'lodash'

const system = theme.font.replace('"Phantom Sans",', '')

const MarkdownBody = styled(Box)`
  color: ${theme.colors.black};
  font-family: ${system};
  font-size: 112.5%;
  line-height: 1.625;
  word-wrap: break-word;
  a {
    color: ${theme.colors.info};
    em {
      font-style: normal;
      &:before {
        content: '_';
      }
      &:after {
        content: '_';
      }
    }
  }
  // hides title, assumes rendering separately
  #toc + div h1:first-of-type {
    display: none;
  }
  h1,
  h2 {
    padding-bottom: ${theme.space[2]}px;
    border-bottom: 1px solid ${theme.colors.smoke};
  }
  h1,
  h2,
  h3,
  h4,
  strong {
    font-weight: bold;
  }
  ${range(1, 6)
    .map(n => `h${n} { font-size: ${theme.fontSizes[6 - n]}px; }`)
    .join('')};
  img {
    max-width: 100%;
    border-radius: ${theme.radii[2]};
  }
  ol,
  ul {
    padding-left: ${theme.space[3] * 1.5}px;
  }
  blockquote {
    border-left: 4px solid ${theme.colors.smoke};
    color: ${theme.colors.slate};
    padding-left: ${theme.space[3]}px;
    margin-left: 0;
  }
  p,
  li {
    margin-top: ${theme.space[2]}px;
    margin-bottom: ${theme.space[2]}px;
  }
  hr {
    border: 0;
    height: 4px;
    background-color: ${theme.colors.primary};
    max-width: ${theme.space[7]}px;
    margin: ${theme.space[4]}px auto;
    border-radius: 4px;
  }
  table {
    width: 100%;
    margin-top: ${theme.space[3]}px;
    margin-bottom: ${theme.space[3]}px;
    border-collapse: collapse;
    border: 1px solid ${theme.colors.smoke};
    th {
      font-weight: ${theme.bold};
      text-align: left;
    }
    td,
    th {
      padding: ${theme.space[2]}px;
      border-right: 1px solid ${theme.colors.smoke};
      border-bottom: 1px solid ${theme.colors.smoke};
    }
    tbody {
      th {
        width: 25%;
      }
      th,
      td {
        border-bottom: 1px solid ${theme.colors.smoke};
      }
      tr:last-child {
        th,
        td {
          border-bottom: 1px solid ${theme.colors.smoke};
        }
      }
    }
  }
  pre,
  code,
  kbd {
    font-family: ${theme.mono};
    font-size: 100%;
    word-break: break-word;
  }
  pre,
  code {
    background-color: ${theme.colors.gray[1]};
    color: ${theme.colors.black};
  }
  a code {
    background-color: ${theme.colors.info};
    color: ${theme.colors.white};
    text-decoration: underline;
  }
  del code {
    text-decoration: inherit;
  }
  pre code {
    padding: 0;
  }
  code,
  kbd {
    border-radius: 3px;
    padding: ${theme.space[1]}px;
  }
  kbd {
    background-color: ${theme.colors.gray[8]};
    color: ${theme.colors.white};
  }
  pre {
    border-radius: ${theme.radius};
    line-height: 1.375;
    max-width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: ${theme.space[3]}px;
    position: relative;
    word-wrap: normal;
  }
  // Custom syntax highlighting
  .namespace {
    opacity: 0.75;
  }
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${theme.colors.gray[6]};
  }
  .token.punctuation {
    color: ${theme.colors.gray[6]};
  }
  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: ${theme.colors.red[6]};
  }
  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: ${theme.colors.teal[8]};
  }
  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: ${theme.colors.violet[6]};
  }
  .token.url {
    background: ${theme.colors.blue[1]};
    color: ${theme.colors.indigo[6]};
  }
  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: ${theme.colors.blue[6]};
  }
  .token.function {
    color: ${theme.colors.pink[6]};
  }
  .token.regex,
  .token.important,
  .token.variable {
    color: ${theme.colors.orange[6]};
  }
  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.entity {
    cursor: help;
  }
  /* Line highlighting */
  pre[data-line] {
    position: relative;
  }
  pre[class*='language-'] > code[class*='language-'] {
    position: relative;
    z-index: 1;
  }
  .line-highlight {
    position: absolute;
    left: 0;
    right: 0;
    margin-top: ${theme.space[2]}px;
    background: rgba(250, 247, 133, 0.8);
    pointer-events: none;
    white-space: pre;
  }
`

export default MarkdownBody

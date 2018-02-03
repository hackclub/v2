import { Box, mediaQueries } from '@hackclub/design-system'
import { range } from 'lodash'

const MarkdownBody = Box.extend`
  color: ${props => props.theme.colors.black};
  font-size: 112.5%;
  line-height: 1.625;

  a {
    color: ${props => props.theme.colors.info};
  }

  /* hides title, assumes rendering separately */
  h1:first-child {
    display: none;
  }

  h1,
  h2 {
    padding-bottom: ${props => props.theme.space[2]}px;
    border-bottom: 1px solid ${props => props.theme.colors.smoke};
  }

  ${headings};

  img {
    max-width: 100%;
  }

  ol,
  ul {
    padding-left: ${props => props.theme.space[3] * 1.5}px;
    ${mediaQueries[1]} {
      padding-left: 0;
    }
  }

  hr {
    border: 0;
    height: 4px;
    background-color: ${props => props.theme.colors.primary};
    max-width: ${props => props.theme.space[7]}px;
    margin: ${props => props.theme.space[4]}px auto;
    border-radius: 4px;
  }

  pre,
  code,
  kbd {
    font-family: ${props => props.theme.mono};
    font-size: ${props => props.theme.fontSizes[2]}px;
    word-break: break-word;
  }

  pre,
  code {
    background-color: ${props => props.theme.colors.gray[1]};
    color: ${props => props.theme.colors.black};
  }
  a code {
    background-color: ${props => props.theme.colors.info};
    color: ${props => props.theme.colors.white};
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
    padding: ${props => props.theme.space[1]}px;
  }

  kbd {
    background-color: ${props => props.theme.colors.gray[8]};
    color: ${props => props.theme.colors.white};
  }

  pre {
    border-radius: ${props => props.theme.radius};
    line-height: 1.375;
    max-width: 100%;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    padding: ${props => props.theme.space[3]}px;
    position: relative;
    word-wrap: normal;
  }

  /* Syntax highlighting */
  .namespace {
    opacity: 0.75;
  }
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${props => props.theme.colors.gray[6]};
  }
  .token.punctuation {
    color: ${props => props.theme.colors.gray[6]};
  }
  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: ${props => props.theme.colors.red[6]};
  }
  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: ${props => props.theme.colors.teal[8]};
  }
  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: ${props => props.theme.colors.violet[6]};
  }
  .token.url {
    background: ${props => props.theme.colors.blue[1]};
    color: ${props => props.theme.colors.indigo[6]};
  }
  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: ${props => props.theme.colors.blue[6]};
  }
  .token.function {
    color: ${props => props.theme.colors.pink[6]};
  }
  .token.regex,
  .token.important,
  .token.variable {
    color: ${props => props.theme.colors.orange[6]};
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
    margin-top: ${props => props.theme.space[2]}px;
    background: rgba(250, 247, 133, 0.8);
    pointer-events: none;
    white-space: pre;
  }
`

const headings = props =>
  range(1, 6)
    .map(
      level => `h${level} { font-size: ${props.theme.fontSizes[6 - level]}px; }`
    )
    .join('')

export default MarkdownBody

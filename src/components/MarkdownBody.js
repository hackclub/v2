import { Box } from '@hackclub/design-system'
import { range } from 'lodash'

const MarkdownBody = Box.extend`
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.fontSizes[2]};

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
    background-color: ${props => props.theme.colors.smoke};
    color: ${props => props.theme.colors.black};
    font-size: inherit;
    br {
      display: none;
    }
  }
  del code {
    text-decoration: inherit;
  }

  code {
    border-radius: 2px;
    padding-left: ${props => props.theme.space[1]}px;
    padding-right: ${props => props.theme.space[1]}px;
  }

  pre {
    word-wrap: normal;
    padding: ${props => props.theme.space[3]}px;
    border-radius: ${props => props.theme.radius};
    > code {
      padding: 0;
      margin: 0;
      word-break: normal;
      white-space: pre;
      background: transparent;
      border: 0;
    }
  }

  .highlight {
    margin-bottom: ${props => props.theme.space[3]}px;

    pre {
      margin-bottom: 0;
      word-break: normal;
    }
  }

  .highlight pre,
  pre {
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
  }

  pre code,
  pre tt {
    display: inline;
    max-width: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0;
  }

  ${headings};
`

const headings = props =>
  range(1, 6)
    .map(
      level => `h${level} { font-size: ${props.theme.fontSizes[6 - level]}px; }`
    )
    .join('')

export default MarkdownBody

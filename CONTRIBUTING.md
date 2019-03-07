# Contributing

First, thank you for contributing! Here’s some basics about our codebase.

## Quick Start

1. Clone the repository and enter it
```sh
git clone https://github.com/hackclub/site.git
cd site
```sh
2. Update submodules (this may take a little while)
```sh
git submodule init && git submodule update
```
3. Install packages & run
```sh
yarn && yarn run dev
```
4. It should now be running, open [localhost:8000](http://localhost:8000) to view

## Submodules

The Git submodule to [hackclub/hackclub](https://github.com/hackclub/hackclub)
is for including the Workshop source files.

## Organization

This site is a standard [Gatsby](https://www.gatsbyjs.org) site, so:

* Pages are in `src/pages/`. They use unnamed default exports (e.g.
  `export default () => ()`).
* Components are in `src/components/`. They use named default exports (e.g.
  `class Hello extends Component {}` + `export default Hello`).

## Formatting

In all prose (form labels, text blocks, etc), use rich quotes.

For code formatting, we use [Prettier](https://prettier.io) with options.
Before committing, run `yarn run fmt` and you’re good to go.

## Design System

This site uses the [Hack Club Design System](https://design.hackclub.com) for
all UI primitives (Text, Buttons, etc).

* Use `styled-components` to add any custom styling to DS components.
* Whenever style utility props (whitespace, color, etc) might be used,
  make use of DS’s components.
* If style utility props aren’t needed, use JSX tags or `styled.tag`
  for performance.

## Images

Before adding images (in `static/`), resize them to a logical size and run
[Guetzli](https://github.com/google/guetzli/) on them for optimization.

Improvements to image serving are planned but not yet in place.

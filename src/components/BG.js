import React from 'react'
import { cx } from '@hackclub/design-system'

const BG = ({ color }) => <style children={`body{background:${cx(color)};}`} />

export default BG

import React from 'react'

import Layout from 'components/Layout'
import Nav from 'components/Nav'
import Particles from 'components/workshops/Particles'
import Grid from 'components/workshops/Grid'
import Card from 'components/workshops/Card'

export default () => (
  <Layout>
    <Particles>
      <Nav color="muted" />

      <Grid>
        <Card>Hello spring!</Card>
        <Card>Hello spring!</Card>
        <Card>Hello spring!</Card>
        <Card>Hello spring!</Card>
        <Card>Hello spring!</Card>
        <Card>Hello spring!</Card>
        <Card>Hello spring!</Card>
        <Card>Hello spring!</Card>
      </Grid>
      <Grid>
        <Card>Hello spring!</Card>
        <Card>Hello spring!</Card>
        <Card>Hello spring!</Card>
        <Card>Hello spring!</Card>
        <Card>Hello spring!</Card>
      </Grid>
      <Grid>
        <Card>Hello spring!</Card>
        <Card>Hello spring!</Card>
        <Card>Hello spring!</Card>
        <Card>Hello spring!</Card>
        <Card>Hello spring!</Card>
      </Grid>
    </Particles>
  </Layout>
)

import React from 'react'
import { Grid, GridColumn, Form, Button } from 'semantic-ui-react'


const Login = () => {
  return (
    <Grid centered>
      <GridColumn style={{ maxWidth: 550, marginTop: 50 }}>
        <Form>
          <Form.Field>
            <label>Email</label>
            <input placeholder='Email' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder='Password' />
          </Form.Field>
          <Button type='submit'>Login</Button>
        </Form>
      </GridColumn>
    </Grid>
  )
}

export default Login
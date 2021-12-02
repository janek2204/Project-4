import React from 'react'
import { Form, Button, GridColumn, Grid } from 'semantic-ui-react'


const Register = () => {

  return (
    <Grid centered>
      <GridColumn style={{ maxWidth: 550, marginTop: 50 }}>
        <Form>
          <Form.Field>
            <label>First Name</label>
            <input placeholder='First Name' />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder='Last Name' />
          </Form.Field>
          <Form.Field>
            <label>User name</label>
            <input placeholder='User name' />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input placeholder='Email' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder='Password' />
          </Form.Field>
          <Form.Field>
            <label>Password Confirmation</label>
            <input placeholder='Password Confirmation' />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </GridColumn>
    </Grid>
  )
}

export default Register
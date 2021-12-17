/* eslint-disable quotes */
import React, { useState } from 'react'
import { Grid, GridColumn, Form, Button, Header, Input } from 'semantic-ui-react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


const Login = () => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    email: "",
    paswword: "",
  })

  const [errors, setErrors] = useState([])


  const handleChange = e => {
    const newFormData = { ...formData, [e.target.name]: e.target.value }
    setFormData(newFormData)
  }

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const { data } = await axios.post('api/auth/login/', formData)
      setTokenToLocalStorage(data.token)
      history.push('/profile/')
    } catch (err) {
      setErrors(err.response.data.detail)
    }
  }
  return (
    <Grid centered>
      <GridColumn style={{ maxWidth: 550, marginTop: 100, borderRadius: '15px' }} color='black'>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label color='white'>Email</label>
            <Input
              label={{ icon: 'star', color: 'green' }}
              labelPosition='right corner' 
              required={true}
              name='email'
              type='email'
              onChange={handleChange}
              placeholder='Email' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input
              label={{ icon: 'star', color: 'green' }}
              labelPosition='right corner' 
              required={true}
              name='password'
              type='password'
              onChange={handleChange}
              placeholder='Password' />
            {errors && <Header sub color='red'>{errors}</Header>}
          </Form.Field>
          <Button type='submit' floated='right' color='blue' style={{ borderRadius: '15px' }}>Login</Button>
        </Form>
      </GridColumn>
    </Grid>
  )
}

export default Login
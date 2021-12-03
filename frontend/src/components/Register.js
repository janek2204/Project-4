/* eslint-disable quotes */
import React, { useState } from 'react'
import { Form, Button, GridColumn, Grid } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const history = useHistory()

  const [formData, setFormData] = useState({
    first_name: "",
    username: "",
    last_name: "",
    email: "",
    password: "",
    profile_image: "",
    password_confirmation: "",
  })

  const [errors, setErrors] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    profile_image: "",
    password_confirmation: "",
  })

  const handleChange = e => {
    const newData = { ...formData, [e.target.name]: e.target.value }
    setFormData(newData)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('api/auth/register/', formData)
      history.push('/login')
    } catch (err) {
      setErrors(err.response.data)
    }
  }
  return (
    <Grid centered>
      <GridColumn style={{ maxWidth: 550, marginTop: 50 }}>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>First Name</label>
            <input
              required={true}
              name='first_name'
              type='text'
              onChange={handleChange}
              placeholder='First Name' />
            {errors.first_name && <label sub color='red'>{errors.first_name}</label>}
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input
              required={true}
              name='last_name'
              type='text'
              onChange={handleChange}
              placeholder='Last Name' />
            {errors.last_name && <label sub color='red'>{errors.last_name}</label>}
          </Form.Field>
          <Form.Field>
            <label>User name</label>
            <input
              placeholder='User name'
              required={true}
              name='username'
              type='text'
              onChange={handleChange} />
            {errors.username && <label sub color='red'>{errors.username}</label>}
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              required={true}
              name='email'
              type='text'
              onChange={handleChange}
              placeholder='Email' />
            {errors.email && <label sub color='red'>{errors.email}</label>}
          </Form.Field>
          <Form.Field>
            <label>Profile Image</label>
            <input
              name='profile_image'
              type='text'
              onChange={handleChange}
              placeholder='Profile Image' />
            {errors.profile_image && <label sub color='red'>{errors.profile_image}</label>}
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              required={true}
              name='password'
              type='text'
              onChange={handleChange}
              placeholder='Password' />
            {errors.password && <label sub color='red'>{errors.password}</label>}
          </Form.Field>
          <Form.Field>
            <label>Password Confirmation</label>
            <input
              required={true}
              name='password_confirmation'
              type='text'
              onChange={handleChange}
              placeholder='Password Confirmation' />
            {errors.password_confirmation && <label sub color='red'>{errors.password_confirmation}</label>}
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </GridColumn>
    </Grid>
  )
}

export default Register
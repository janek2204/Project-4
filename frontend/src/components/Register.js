/* eslint-disable quotes */
import React, { useState } from 'react'
import { Form, Button, GridColumn, Grid, Input, Segment, Container, Header } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { ImageUploadRegister } from './ImageUploadRegister'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
    toastRegister()
    e.preventDefault()
    try {
      await axios.post('api/auth/register/', formData)
      history.push('/login')
    } catch (err) {
      setErrors(err.response.data)
    }

  }

  const handleImageUrl = url => {
    setFormData({ ...formData, profile_image: url })
  }


  const toastRegister = () => {
    toast.success('Thank you for registering!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      color: 'blue',
      theme: 'dark',
    })
  }

  
  return (
    <>
      <Container textAlign='center'>
        <Segment style={{ margin: 'auto', maxWidth: 550, borderRadius: '15px' }}>
          <Header as='h1'> Registration Form</Header>
        </Segment>
      </Container>
      <Grid centered>
        <GridColumn style={{ maxWidth: 550, marginTop: 50, borderRadius: '15px' }} color='black'>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>First Name</label>
              <Input
                label={{ icon: 'star', color: 'green' }}
                labelPosition='right corner'
                required={true}
                name='first_name'
                type='text'
                onChange={handleChange}
                placeholder='First Name' />
              {errors.first_name && <label sub color='red'>{errors.first_name}</label>}
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <Input
                label={{ icon: 'star', color: 'green' }}
                labelPosition='right corner'
                required={true}
                name='last_name'
                type='text'
                onChange={handleChange}
                placeholder='Last Name' />
              {errors.last_name && <label sub color='red'>{errors.last_name}</label>}
            </Form.Field>
            <Form.Field>
              <label>User name</label>
              <Input
                label={{ icon: 'star', color: 'green' }}
                labelPosition='right corner'
                placeholder='User name'
                required={true}
                name='username'
                type='text'
                onChange={handleChange} />
              {errors.username && <label sub color='red'>{errors.username}</label>}
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Input
                label={{ icon: 'star', color: 'green' }}
                labelPosition='right corner'
                required={true}
                name='email'
                type='text'
                onChange={handleChange}
                placeholder='Email' />
              {errors.email && <label sub color='red'>{errors.email}</label>}
            </Form.Field>
            <Form.Field>
              <label>Profile Image</label>
              <ImageUploadRegister
                name='profile_image'
                value={formData.profile_image}
                handleImageUrl={handleImageUrl} />
              {errors.profile_image && <label sub color='red'>{errors.profile_image}</label>}
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
              {errors.password && <label sub color='red'>{errors.password}</label>}
            </Form.Field>
            <Form.Field>
              <label>Password Confirmation</label>
              <Input
                label={{ icon: 'star', color: 'green' }}
                labelPosition='right corner'
                required={true}
                name='password_confirmation'
                type='password'
                onChange={handleChange}
                placeholder='Password Confirmation' />
              {errors.password_confirmation && <label sub color='red'>{errors.password_confirmation}</label>}
            </Form.Field>
            <Button type='submit' color='blue' floated='right' style={{ borderRadius: '15px' }}>Submit</Button>
          </Form>
        </GridColumn>
      </Grid>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
      /></>
  )
}

export default Register
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Grid, GridColumn, Button, Dropdown, Input } from 'semantic-ui-react'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/authentication'
import { ImageUpload } from './ImageUpload'


const Create = () => {
  const history = useHistory()

  const [addAdvert, setAdvertData] = useState({
    title: '',
    description: '',
    quantity: '',
    price: '',
    images: '',
    category: '',
  })

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    quantity: '',
    images: '',
    price: '',
    category: '',
  })


  const handleChange = e => {
    const newAdvert = { ...addAdvert, [e.target.name]: e.target.value }
    setAdvertData(newAdvert)
  }
  const handleDropdown = e => {
    setAdvertData({ ...addAdvert, category: e.target.id })
  }


  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('api/adverts/', addAdvert, {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      })
      history.push('/profile/')
    } catch (err) {
      setErrors(err.response.data)
    }
  }


  const handleImageUrl = url => {
    setAdvertData({ ...addAdvert, images: url })
  }
  console.log(addAdvert)
  return (
    <Grid centered>
      <GridColumn style={{ maxWidth: 550, marginTop: 100, borderRadius: '15px' }} color='black'>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Title</label>
            <Input
              label={{ icon: 'star', color: 'green' }}
              labelPosition='right corner'
              required={true}
              name='title'
              type='text'
              onChange={handleChange}
              placeholder='Yor advert title' />
            {errors.title && <label sub color='red'>{errors.title}</label>}
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <Input
              label={{ icon: 'star', color: 'green' }}
              labelPosition='right corner'
              required={true}
              size='3000'
              name='description'
              type='text'
              onChange={handleChange}
              placeholder='Your item description' />
            {errors.description && <label sub color='red'>{errors.description}</label>}
          </Form.Field>
          <Form.Field>
            <label>Quantity</label>
            <Input
              label={{ icon: 'star', color: 'green' }}
              labelPosition='right corner'
              placeholder='How many do you have to sell?'
              required={true}
              name='quantity'
              type='number'
              onChange={handleChange} />
            {errors.quantity && <label sub color='red'>{errors.quantity}</label>}
          </Form.Field>
          <Form.Field>
            <label>Image</label>
            <ImageUpload
              value={addAdvert.images}
              name='images'
              handleImageUrl={handleImageUrl} />
            {errors.images && <label sub color='red'>{errors.images}</label>}
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <Input
              label={{ icon: 'star', color: 'green' }}
              labelPosition='right corner'
              required={true}
              name='price'
              type='text'
              onChange={handleChange}
              placeholder='Price' />
            {errors.price && <label sub color='red'>{errors.price}</label>}
          </Form.Field>
          <Form.Field>
            <label>Category</label>
            <Dropdown
              placeholder='Choose category'
              fluid
              search
              selection
              text={addAdvert.category}
            >
              <Dropdown.Menu >
                <Dropdown.Header icon='tags' content='Choose advert category' />
                <Dropdown.Item onClick={handleDropdown} id='ELECTRONICS'>Electronics</Dropdown.Item>
                <Dropdown.Item onClick={handleDropdown} id='CARS'>Cars</Dropdown.Item>
                <Dropdown.Item onClick={handleDropdown} id='HOME'>Home</Dropdown.Item>
                <Dropdown.Item onClick={handleDropdown} id='GARDEN'>Garden</Dropdown.Item>
                <Dropdown.Item onClick={handleDropdown} id='OTHER'>Other</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {errors.category && <label sub color='red'>{errors.category}</label>}
          </Form.Field>
          <Button type='submit' floated='right' color='blue' style={{ borderRadius: '15px' }}>Submit</Button>
        </Form>
      </GridColumn>
    </Grid>

  )
}

export default Create
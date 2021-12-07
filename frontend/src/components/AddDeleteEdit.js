import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Grid, GridColumn, Button } from 'semantic-ui-react'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/authentication'

const AddEditDelete = ({ editAdvert }) => {

  const history = useHistory()

  const [addAdvert, setAdvertData] = useState({
    title: '',
    description: '',
    quantity: '',
    images: '',
    price: '',
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

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('api/adverts/', addAdvert,{
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      })
      history.push('/profile')
    } catch (err) {
      setErrors(err.response.data)
    }
  }

  const handleEdit = async e => {
    e.preventDefault()
    try {
      await axios.put(`api/adverts/${editAdvert.id}/`, addAdvert,{
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      })
      history.push('/profile')
    } catch (err) {
      setErrors(err.response.data)
    }
  }
  console.log(addAdvert)
  return (
    <>{ editAdvert ?  <Grid centered>
      <GridColumn style={{ maxWidth: 550, marginTop: 100, borderRadius: '15px' }} color='black'>
        <Form onSubmit={handleEdit}>
          <Form.Field>
            <label>Title</label>
            <input
              required={true}
              defaultValue={editAdvert.title}
              name='title'
              type='text'
              onChange={handleChange}
              placeholder='Yor advert title'/>
            {errors.title && <label sub color='red'>{errors.title}</label>}
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              required={true}
              defaultValue={editAdvert.description}
              name='description'
              type='text'
              onChange={handleChange}
              placeholder='Your item description' />
            {errors.description && <label sub color='red'>{errors.description}</label>}
          </Form.Field>
          <Form.Field>
            <label>Quantity</label>
            <input
              placeholder='How many do you have to sell?'
              defaultValue={editAdvert.quantity}
              required={true}
              name='quantity'
              type='text'
              onChange={handleChange} />
            {errors.quantity && <label sub color='red'>{errors.quantity}</label>}
          </Form.Field>
          <Form.Field>
            <label>Image</label>
            <input
              name='images'
              type='text'
              defaultValue={editAdvert.images}
              onChange={handleChange}
              placeholder='Images' />
            {errors.images && <label sub color='red'>{errors.images}</label>}
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <input
              required={true}
              defaultValue={editAdvert.price}
              name='price'
              type='text'
              onChange={handleChange}
              placeholder='Price' />
            {errors.price && <label sub color='red'>{errors.price}</label>}
          </Form.Field>
          <Form.Field>
            <label>Category</label>
            <input
              required={true}
              defaultValue={editAdvert.category}
              name='category'
              type='text'
              onChange={handleChange}
              placeholder='Category' />
            {errors.category && <label sub color='red'>{errors.category}</label>}
          </Form.Field>
          <Button type='submit' primary>Submit</Button>
        </Form>
      </GridColumn>
    </Grid> :  <Grid centered>
      <GridColumn style={{ maxWidth: 550, marginTop: 100, borderRadius: '15px' }} color='black'>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Title</label>
            <input
              required={true}
              name='title'
              type='text'
              onChange={handleChange}
              placeholder='Yor advert title' />
            {errors.title && <label sub color='red'>{errors.title}</label>}
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              required={true}
              name='description'
              type='text'
              onChange={handleChange}
              placeholder='Your item description' />
            {errors.description && <label sub color='red'>{errors.description}</label>}
          </Form.Field>
          <Form.Field>
            <label>Quantity</label>
            <input
              placeholder='How many do you have to sell?'
              required={true}
              name='quantity'
              type='text'
              onChange={handleChange} />
            {errors.quantity && <label sub color='red'>{errors.quantity}</label>}
          </Form.Field>
          <Form.Field>
            <label>Image</label>
            <input
              name='images'
              type='text'
              onChange={handleChange}
              placeholder='Images' />
            {errors.images && <label sub color='red'>{errors.images}</label>}
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <input
              required={true}
              name='price'
              type='text'
              onChange={handleChange}
              placeholder='Price' />
            {errors.price && <label sub color='red'>{errors.price}</label>}
          </Form.Field>
          <Form.Field>
            <label>Category</label>
            <input
              required={true}
              name='category'
              type='text'
              onChange={handleChange}
              placeholder='Category' />
            {errors.category && <label sub color='red'>{errors.category}</label>}
          </Form.Field>
          <Button type='submit' primary>Submit</Button>
        </Form>
      </GridColumn>
    </Grid>}</>
  )
}

export default AddEditDelete
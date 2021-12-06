import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header, Image, Segment, Comment, Form, Button, Divider, Modal, Icon } from 'semantic-ui-react'
import { getTokenFromLocalStorage, getPayLoad, userIsAuthenticated } from '../helpers/authentication'


const SingleAdvert = () => {

  const ownerId = getPayLoad()
  const [open, setOpen] = useState(false)
  const { id } = useParams()
  const [newComment, setNewComment] = useState(false)
  const [advertData, setAdvertData] = useState()
  const [review, setReview] = useState({
    review_text: '',
    rating: 0,
    adverts: id,
  })

  const handleChange = e => {
    const newComment = { ...review, [e.target.name]: e.target.value }
    setReview(newComment)
  }
  const handleSubmit = async e => {
    e.preventDefault()
    await axios.post('/api/reviews/', review, {
      headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
    })
    setNewComment(!newComment)
    document.querySelector('textarea').value = ''
  }
  const deleteComment = async e => {
    console.log(e.target.value)
    await axios.delete(`/api/reviews/${e.target.value}/`,
      {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      }
    )
    setOpen(false)
    setNewComment(!newComment)
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/adverts/${id}`)
      setAdvertData(data)
    }
    getData()
  }, [id, newComment])
  
  return (
    <>
      {advertData ? <>
        <Header as='h1' textAlign='left'>{advertData.title}</Header>
        <Header as='h2'>{advertData.description}</Header>
        <Image src={advertData.images} />
        <Segment>
          <Header as='h3'>Owner: {advertData.owner.username}</Header>
          <Header as='h4'>Price: {advertData.price}</Header>
          <Header as='h4'>Quantity: {advertData.quantity}</Header>
        </Segment>
        <Segment>
          {advertData.reviews.map(review => {
            return (
              <Comment key={review.id}>
                <Comment.Avatar as='a' src={review.owner.profile_image} />
                <Comment.Content>
                  <Comment.Author as='h4'>{review.owner.username}</Comment.Author>
                  <Comment.Metadata>
                    <div>1 day ago</div>
                  </Comment.Metadata>
                  {userIsAuthenticated() && review.owner.id === ownerId.sub &&
                    <Modal
                      closeIcon
                      open={open}
                      trigger={<Button color='red' floated='right'>Delete comment</Button>}
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                    >
                      <Header icon='archive' content='Deleting comment' />
                      <Modal.Content>
                        <p>
                          Are you sure you want to delete your comment?
                        </p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button color='red' onClick={() => setOpen(false)}>
                          <Icon name='remove' /> No
                        </Button>
                        <Button color='green' value={review.id} onClick={deleteComment}>
                          <Icon name='checkmark' /> Yes
                        </Button>
                      </Modal.Actions>
                    </Modal>}
                  <Comment.Text>
                    <Header as='h5'>{review.review_text}</Header>
                  </Comment.Text>
                </Comment.Content>
                <Divider />
              </Comment>
            )
          })}
        </Segment>
        <Comment.Group>
          <Form reply>
            <Form.TextArea onChange={handleChange} name='review_text' />
            <Button onClick={handleSubmit} content='Add Comment' labelPosition='left' icon='edit' primary />
          </Form>
        </Comment.Group>
      </>

        : <Header as='h1' textAlign='center'>Something went wrong ☹️</Header>
      }</>
  )
}

export default SingleAdvert
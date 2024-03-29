import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Header, Image, Segment, Comment, Form, Button, Divider, Modal, Icon, CommentGroup, Grid, GridColumn, IconGroup, Container, ButtonGroup } from 'semantic-ui-react'
import { getTokenFromLocalStorage, getPayLoad, userIsAuthenticated } from '../helpers/authentication'
import { toast, ToastContainer, Flip } from 'react-toastify'


const SingleAdvert = ({ setBasketItems, basketItems }) => {

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

  const addedItem = () => {
    toast.info('Item has been added to your basket!', {
      position: 'top-center',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }

  const addingToast = (postTitle) => {
    toast.success(`Thank you for reviewing ${postTitle}!`, {
      position: 'top-center',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }


  const onAdd = () => {
    const newBasket = [...basketItems, advertData]
    setBasketItems(newBasket)
    addedItem()
  }

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
    addingToast(advertData.title)
    document.querySelector('textarea').value = ''
  }
  const deleteComment = async e => {
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
      const { data } = await axios.get(`/api/adverts/${id}/`)
      setAdvertData(data)
    }
    getData()
  }, [id, newComment])

  return (
    <Container>
      <Grid columns={2}>
        {advertData ? <>
          <GridColumn>
            <Segment>
              <Header as='h1' textAlign='center'><IconGroup><Icon name='hand point right outline' /></IconGroup>{advertData.title}</Header>
            </Segment>

            <Image src={advertData.images} fluid />
            <Segment>
              <Grid columns={2}>
                <GridColumn>
                  <Header as='h3'>Seller:<br /> {advertData.owner.username}</Header>
                  <Header as='h4'>Price:<br /> {advertData.price} £</Header>
                  <Header as='h4'>Quantity: {advertData.quantity}</Header>
                </GridColumn>
                <GridColumn>
                  <Header as='h3'>Item description:</Header>
                  <Header as='h4'>{advertData.description}</Header>
                  {!userIsAuthenticated() ? '' : <Header as='h4'>For more information contact me at <a href={`mailto:${advertData.owner.email}?subject=${advertData.title}`}>{advertData.owner.email}</a></Header>}
                </GridColumn>
              </Grid>
            </Segment>
          </GridColumn>
          <GridColumn>
            <Segment textAlign='center'>
              <Header as='h1'>Reviews</Header>
            </Segment>
            <CommentGroup>
              <Segment>{advertData.reviews.map(review => {
                return (
                  <Comment key={review.id}>
                    <Comment.Avatar as='a' src={review.owner.profile_image} /><Comment.Content>
                      <Comment.Author as='h4'>{review.owner.username}</Comment.Author>
                      <Comment.Metadata>
                        {review.created_at.slice(0, 10)}
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
              })
              }
              </Segment>
            </CommentGroup>
            <Comment.Group>
              {!userIsAuthenticated() ? <Segment><Header textAlign='center'>To be able to add reviews you have to <a href='/login'>Login</a> or <a href='/register'> Register!</a></Header></Segment> : <Form reply>
                <Form.TextArea onChange={handleChange} name='review_text' />
                <ButtonGroup size='big' compact>
                  {<Button onClick={handleSubmit} content='Add review' labelPosition='right' icon='edit' primary />}
                  {advertData.owner.id === ownerId.sub ? <Link to='/edit'><Button icon='edit' labelPosition='right' color='orange' floated='left' content='Edit' /></Link> : ''}
                  {advertData.owner.id === ownerId.sub ? '' : <Button icon='plus' onClick={onAdd} labelPosition='right' positive floated='right' content='Add to basket' />}
                </ButtonGroup>
              </Form>}
            </Comment.Group>
          </GridColumn>

        </>
          : <Header as='h1' textAlign='center'>Something went wrong ☹️</Header>
        }

      </Grid>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        transition={Flip}
      />
    </Container>
  )
}

export default SingleAdvert
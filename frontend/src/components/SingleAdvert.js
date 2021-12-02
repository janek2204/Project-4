import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header, Image, Segment } from 'semantic-ui-react'


const SingleAdvert = () => {

  const { id } = useParams()
  const [advertData, setAdvertData] = useState()

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/adverts/${id}`)
      setAdvertData(data)
    }
    getData()
  }, [id])
  console.log(advertData)
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
              <Segment vertical key={review.id}>
                <Header as='h3'>{review.review_text}<br />rating: {review.rating}</Header>
                <Header as='h5'>Posted by:{review.owner.username}<Image src={review.owner.profile_image} /></Header>
              </Segment>
            )
          })}
        </Segment></>

        : <Header as='h1' textAlign='center'>Something went wrong ☹️</Header>
      }</>
  )
}

export default SingleAdvert
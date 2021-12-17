import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Header, Segment, Image } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

const AdvertCard = ({ title, price, images, id, category }) => {

  const [advertData, setAdvertData] = useState([])
  const history = useHistory()
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/adverts/${id}/`)
      setAdvertData(data)
    }
    getData()
  }, [id])
  console.log(advertData)
  return (
    <Card  fluid onClick={() => history.push(`/adverts/${id}/`)}>
      <Header as='h1' textAlign='left' > {title}</Header >
      <Header as='h5' textAlign='left'>Category: {category}</Header>
      <Segment vertical>
        <Header as='h3' textAlign='right'>Price: {price} £</Header>
      </Segment>
      <Image src={images}  />
    </Card>
  )
}

export default AdvertCard
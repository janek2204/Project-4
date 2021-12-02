import React, { useEffect, useState } from 'react'
import { Container, Header } from 'semantic-ui-react'
import axios from 'axios'
import AdvertCard from './AdvertCard'

const Adverts = () => {

  const [adverts, setAdverts] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('api/adverts')
      setAdverts(data)
    }
    getData()
  }, [])

  return (
    <>
      {adverts ?
        <Container>
          {adverts.map(advert => {
            return (
              <AdvertCard
                key={advert.id}
                id={advert.id}
                price={advert.price}
                title={advert.title}
                images={advert.images} />
            )
          })}</Container> : <Header as='h1' textAlign='center'>Something went wrong</Header>}
    </>
  )
}

export default Adverts
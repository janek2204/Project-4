import React, { useEffect, useState } from 'react'
import { Container, Dropdown } from 'semantic-ui-react'
import axios from 'axios'
import AdvertCard from './AdvertCard'

const Adverts = () => {

  const [adverts, setAdverts] = useState([])
  const [filteredAdverts, setFilteredAdverts] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('api/adverts/')
      setAdverts(data)
    }
    getData()
  }, [])

  const handleClick = event => {
    const filtering = adverts.filter(advert => {
      return advert.category === event.target.id
    })
    setFilteredAdverts(filtering)
  }

  const resetFilter = () => {
    setFilteredAdverts([])
  }

  return (
    <>

      <Dropdown
        text='Filter'
        icon='filter'
        floating
        labeled
        button
        className='icon'
      >
        <Dropdown.Menu>
          <Dropdown.Header icon='tags' content='Filter by category' />
          <Dropdown.Divider />
          <Dropdown.Item id='ELECTRONICS' onClick={handleClick}>Electronics</Dropdown.Item>
          <Dropdown.Item id='OTHER' onClick={handleClick}>Other</Dropdown.Item>
          <Dropdown.Item id='CARS' onClick={handleClick}>Cars</Dropdown.Item>
          <Dropdown.Item id='GARDEN' onClick={handleClick}>Garden</Dropdown.Item>
          <Dropdown.Item id='HOME' onClick={handleClick}>Home</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Header onClick={resetFilter} content='Show all adverts' />
        </Dropdown.Menu>
      </Dropdown>
      {filteredAdverts.length > 0 ?
        <Container>
          {filteredAdverts.map(advert => {
            return (
              <AdvertCard
                key={advert.id}
                id={advert.id}
                price={advert.price}
                title={advert.title}
                images={advert.images} />
            )
          })}</Container> :
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
          })}</Container>
      }
    </>
  )
}

export default Adverts
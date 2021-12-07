import React from 'react'
import { Header, Card } from 'semantic-ui-react'


const Basket = ({ basketItems }) => {

  return (
    <>
      {/* {basketItems.length === 0 && <Header as='h1' textAlign='center'>Your basket is empty</Header>} */}
      {basketItems.length > 0 ?
        basketItems.map((item) => {
          return (
            <Card key={item.id}
              image={item.images}
              header={item.title}
              meta={item.price} />
          )
        })
        : <Header as='h1' textAlign='center'>Your basket is empty</Header>}
      <></>
    </>
  )
}

export default Basket



import React from 'react'
import { Header, Card, Container, Grid, GridColumn, Segment, Button } from 'semantic-ui-react'


const Basket = ({ basketItems,setBasketItems }) => {

  const getPrice = basketItems.map((item) => {
    return parseInt(item.price)
  })

  const handlePay = () => {
    setBasketItems([])
  }

  return (
    <Container>
      <Grid columns={2}>
        <GridColumn>
          {basketItems.length > 0 ?
            basketItems.map((item) => {
              return (
                <Card
                  key={item.id}
                  image={item.images}
                  header={item.title}
                  meta={item.price} />
              )
            })
            : <Header as='h1' textAlign='center'>Your basket is empty</Header>}</GridColumn>

        <GridColumn>
          <Segment>
            <Header as='h1'> Your total is: {getPrice.reduce((a,b) => a + b,0)} £</Header>
          </Segment>
          <Segment>
            <Button onClick={handlePay} positive fluid>Pay here</Button>
          </Segment>
        </GridColumn>
      </Grid>
    </Container>
  )
}

export default Basket



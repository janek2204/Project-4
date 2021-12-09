import React from 'react'
import { Header, Card, Container, Grid, GridColumn, Segment, Button } from 'semantic-ui-react'
import { toast, ToastContainer, Zoom } from 'react-toastify'

const Basket = ({ basketItems,setBasketItems }) => {

  const getPrice = basketItems.map((item) => {
    return parseFloat(item.price)
  })

  const handlePay = () => {
    setBasketItems([])
    paidToast()
  }

  const paidToast = () => {
    toast.info('Thank you for shopping with us, have greate day!', {
      position: 'top-center',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
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
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        transition={Zoom}
        style={{ width: '50em' }}
      />
    </Container>
  )
}

export default Basket



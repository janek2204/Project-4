import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Header, Segment } from 'semantic-ui-react'

const Home = () => {
  const history = useHistory()
  return (
    <Segment textAlign='center'>
      <Header as='h1'>Homepage</Header>
      <Button onClick={() => history.push('/adverts')}>Go to all adverts!</Button>
    </Segment>
    
    
  )
}

export default Home
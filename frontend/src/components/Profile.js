import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link , useHistory } from 'react-router-dom'
import { Card, Header, Segment, Image, Grid, GridColumn, Button, Container, Divider, Modal, Icon, ButtonGroup } from 'semantic-ui-react'
import { getPayLoad } from '../helpers/authentication'
import { getTokenFromLocalStorage } from '../helpers/authentication'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Profile = ({ setEditAdvert }) => {
  const [userData, setUserData] = useState([])
  const getUserId = getPayLoad()
  const [userAdverts, setUserAdverts] = useState([])
  const [refreshAfterDelete, setRefresh] = useState(false)
  const [open, setOpen] = useState(false)
  const history = useHistory()

  const showMeToast = (name) => {
    toast.info(`Welcome back ${name}!`, {
      position: 'top-center',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }

  console.log('userAdverts ---->',userAdverts)
  console.log('userData ---->',userData)


  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`api/auth/profile/${getUserId.sub}/`)
      setUserData(data)
      setUserAdverts(data.owner)
      showMeToast(data.first_name)
    }
    getData()
    
  }, [getUserId.sub, refreshAfterDelete])

  const deleteAdvert = async (id) => {
    await axios.delete(`api/adverts/${id}/`, {
      headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
    }),
    setRefresh(!refreshAfterDelete)
  }

  const pushToEdit = (id) => {
    const newAdvert = userAdverts.find((adevrt) => adevrt.id === id)
    setEditAdvert(newAdvert)
    history.push('/edit')
  }

  return (
    <Container>
      <Grid columns={2}>
        <GridColumn>
          <Card
            fluid
            image={userData.profile_image}
            header={`${userData.first_name} ${userData.last_name}`}
            meta={userData.username}
          />
        </GridColumn>
        <GridColumn textAlign='center'>
          <Link to='/create'><Button size='massive' fluid positive>Create new advert</Button></Link>
          <Segment>
            <Header as='h1' textAlign='center'>Your adverts</Header>
          </Segment>
          <Card fluid>
            {userAdverts && userAdverts.map(advert => {
              return (<><Link to={`/adverts/${advert.id}/`} key={advert.id}><Segment raised stacked compact basic>
                <Image src={advert.images} />
                <Header as='h3' textAlign='left'>{advert.title}</Header>
                <Header as='h4' textAlign='left'>Price:<br />{advert.price}£</Header>
              </Segment></Link>
              <Container>
                <ButtonGroup size='big' fluid>
                  <Modal
                    closeIcon
                    open={open}
                    trigger={<Button color='red' floated='right'>Delete Advert</Button>}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                  >
                    <Header icon='archive' content='Deleting comment' />
                    <Modal.Content>
                      <p>
                          Are you sure you want to delete your advert?
                      </p>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button color='red' onClick={() => setOpen(false)}>
                        <Icon name='remove' /> No
                      </Button>
                      <Button color='green' value={advert.id} onClick={() => deleteAdvert(advert.id)}>
                        <Icon name='checkmark' /> Yes
                      </Button>
                    </Modal.Actions>
                  </Modal>
                  <Button.Or />
                  <Button color='blue' onClick={() => pushToEdit(advert.id)}>Edit</Button></ButtonGroup></Container>
              <Divider hidden /></>)
            })}
          </Card>
        </GridColumn>
      </Grid>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </Container>
  )
}

export default Profile
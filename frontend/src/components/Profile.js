import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Header, Segment, Image } from 'semantic-ui-react'
import { getPayLoad } from '../helpers/authentication'

const Profile = () => {
  const [userData, setUserData] = useState([])
  const getUserId = getPayLoad()
  const [userAdverts, setUserAdverts] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`api/auth/profile/${getUserId.sub}`)
      setUserData(data)
      setUserAdverts(data.owner)
    }
    getData()
  }, [getUserId.sub])

  console.log(userAdverts)

  return (
    <Card
      image={userData.profile_image}
      header={`${userData.first_name} ${userData.last_name}`}
      meta={userData.username}
      extra=
        {userAdverts.map(advert => {
          return (<Segment key={advert.id}>
            <Image src={advert.images}/>
            <Header as='h3'>{advert.title}</Header>
            <Header as='h4'>{advert.price}</Header>
          </Segment>)

        })}
    />
  )
}

export default Profile
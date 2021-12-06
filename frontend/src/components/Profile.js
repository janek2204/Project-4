import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Header } from 'semantic-ui-react'
import { getPayLoad } from '../helpers/authentication'

const Profile = () => {
  const [userData,setUserData] = useState([])
  const getUserId = getPayLoad()

  useEffect(() => {
    const getData = async () =>{
      const { data } = await axios.get(`api/auth/profile/${getUserId.sub}`)
      setUserData(data)
    }
    getData()
  },[getUserId.sub])

  console.log(userData)

  return (
    <Header as='h1' textAlign='center'>Profile page</Header>
  )
}

export default Profile
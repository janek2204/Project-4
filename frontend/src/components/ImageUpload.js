import axios from 'axios'
import { Image } from 'semantic-ui-react'

const uploadURL = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

export const ImageUpload = ({ handleImageUrl, value }) => {

  const handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const response = await axios.post(uploadURL, data)
    handleImageUrl(response.data.url)
  }
  return (
    <>
      {value ?  <Image src={value} alt='Choosen image' size='tiny' fluid/> :
        <input
          name='images'
          type='file'
          onChange={handleUpload}
          placeholder='Images' />}
    </>
  )
}


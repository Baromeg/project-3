import React, { useEffect, useState } from 'react'
import { CloudinaryContext, Image } from 'cloudinary-react'
import { fetchPhotos, openUploadWidget } from './CloudinaryService'

const UploadImage = (props) => {
  const [images, setImages] = useState([])
  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: 'greenupload',
      tags: [tag],
      uploadPreset: 'upload'
    }

    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        console.log(photos)
        if (photos.event === 'success') {
          setImages([...images, photos.info.public_id])
          // console.log(photos.info.public_id)
          props.updateImage(photos.info.secure_url)
        }
      } else {
        console.log(error)
      }
    })
  }

  useEffect(() => {
    fetchPhotos('image', setImages)
  }, [])
  return (
    <div>
      <CloudinaryContext cloudName='greenupload'>
        <div className='App'>
          <div className='button' onClick={() => beginUpload()}>
            Upload Image
          </div>
          <section>
            {images &&
              images.map((index) => (
                <div key={index}>
                  <br />
                  <Image publicId={index} />
                  <Image />
                </div>
              ))}
          </section>
        </div>
      </CloudinaryContext>
    </div>
  )
}

export default UploadImage

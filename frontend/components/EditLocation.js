import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import LocationForm from './LocationForm'

const EditLocation = (props) => {
  // console.log(props)

  // * Identify the location accessed by the user
  const locationId = props.match.params.locationId

  // * UseState to set the original location data
  const [formData, updateFormData] = useState({
    category: [],
    address: '',
    name: '',
    timings: '',
    // startDate: '',
    // endDate: '',
    city: '',
    postcode: '',
    longitude: '',
    latitude: '',
    website: '',
    email: '',
    phone: '',
    bio: '',
    image: ''
  })

  // * This variable defines the different categories in the select input
  const categoriesObject = [
    { value: 'Farmers Market', label: 'Farmers Market' },
    { value: 'Farm Shop', label: 'Farm Shop' },
    { value: 'Sustainable Groceries', label: 'Sustainable Groceries' },
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'EV Charging Station', label: 'EV Charging Station' },
    { value: 'Upcycling/Repair', label: 'Upcycling/Repair' },
    { value: 'Circular Economy', label: 'Circular Economy' },
    { value: 'Cycling', label: 'Cycling' }
  ]

  // * Fetch the original location data and filter the categories that the location has preselected
  useEffect(() => {
    Axios.get(`/api/locations/${locationId}`).then(({ data }) => {
      const formData = {
        ...data,
        category: categoriesObject.filter((option) => {
          return data.category.some((category) => {
            return category === option.value
          })
        })
      }
      updateFormData(formData)
      // console.log(formData)
    })
  }, [])

  // * Adds the uploaded image to the data before submitting
  function updateImage(image) {
    const newForm = {
      ...formData,
      image: image
    }
    updateFormData(newForm)
  }

  //* Adds the new selected categories to the data before submitting
  function setSelectedCategories(categories) {
    const newData = {
      ...formData,
      category: categories
    }
    updateFormData(newData)
  }

  // * This functionatilty would allow setting up date range in future releases
  // const [startDate, setStartDate] = useState('')
  // const [endDate, setEndDate] = useState('')

  // * Function to catch the change in the form inputs
  function handleChange(event) {
    const data = {
      ...formData,
      [event.target.name]: event.target.value
    }
    // console.log(data)
    updateFormData(data)
  }

  // * Function to summit the changes from the form inputs to the seeded data
  function handleSubmit(event) {
    event.preventDefault()
    // console.log(event)
    const token = localStorage.getItem('token')
    const newFormData = {
      ...formData,
      // startDate: startDate,
      // endDate: endDate,
      category: formData.category.map((selected) => {
        return selected.value
      })
    }
    Axios.put(`/api/locations/${locationId}`, newFormData, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((resp) => {
      props.history.push(`/locations/${locationId}`)
    })
  }

  // * The form has been split into a separate component LocationFrom.js
  return (
    <LocationForm
      handleSubmit={handleSubmit}
      // inputFields={inputFields}
      formData={formData}
      updateImage={updateImage}
      selectedCategories={formData.category}
      setSelectedCategories={setSelectedCategories}
      // startDate={startDate}
      // endDate={endDate}
      // setStartDate={setStartDate}
      // setEndDate={setEndDate}
      options={categoriesObject}
      handleChange={handleChange}
    />
  )
}

export default EditLocation

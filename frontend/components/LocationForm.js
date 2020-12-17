import React, { useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
// import Datepicker from 'react-datepicker'
import UploadImage from './UploadImage'


const LocationForm = ({ handleSubmit, handleChange, formData,
  selectedCategories, setSelectedCategories, options,
  // setStartDate, setEndDate,
  // startDate, endDate,
  updateImage
}) => {

  const [isVisible, setIsVisible] = useState(false)

  return <div className="container is-fluid my-5">
    <form className='' onSubmit={handleSubmit}>
      <div className='field'>
        <label className='label'>Name*</label>
        <div className="control">
          <input
            className='input'
            type="text"
            onChange={handleChange}
            value={formData['name']}
            name='name'
          />
        </div>
      </div>
      <div className="field">
        <label className='label' onClick={() => setIsVisible(!isVisible)}>Category*</label>
      </div>

      <div className="is-multiple control">
        <Select
          closeMenuOnSelect={false}
          value={selectedCategories}
          onChange={setSelectedCategories}
          components={makeAnimated()}
          options={options}
          isMulti
          autoFocus
          isSearchable
          placeholder="Select the category available"
          className="basic-multi-select"

        />
      </div>
      {/* } */}
      <div className='field mt-3'>
        <label className='label'>Address*</label>
        <div className="control">
          <input
            className='input'
            type="text"
            onChange={handleChange}
            value={formData['address']}
            name='address'
            placeholder='Street and Number'
          />
        </div>
        <div className="control mt-1">
          <input
            label='postcode'
            className='input'
            type="text"
            onChange={handleChange}
            value={formData['postcode']}
            name='postcode'
            placeholder='Postcode'
          />
        </div>
        <div className="control mt-1">
          <input
            className='input'
            type="text"
            onChange={handleChange}
            value={formData['city']}
            name='city'
            placeholder='City'
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Phone</label>
        <div className="control">
          <input
            className='input'
            type="text"
            onChange={handleChange}
            value={formData['phone']}
            name='phone'
          />
        </div>
      </div>

      <div className='field'>
        <label className='label'>Email</label>
        <div className="control">
          <input
            className='input'
            type="text"
            onChange={handleChange}
            value={formData['email']}
            name='email'
          />
        </div>
      </div>

      <div className='field'>
        <label className='label'>Website</label>
        <div className="control">
          <input
            className='input'
            type="text"
            onChange={handleChange}
            value={formData['website']}
            name='website'
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Photo</label>
        <div className="control">
          <UploadImage
            updateImage={updateImage}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Description</label>
        <div className="control">
          <textarea
            className='textarea'
            type="text"
            onChange={handleChange}
            value={formData['bio']}
            name='bio'
          />
        </div>
      </div>


      {/* The datepicker option was not implemented, although is fully functional.
      <label className='label'>Dates</label>

      <div className="tile is-ancestor is-centered">
        <div className="control field is-grouped is-grouped-multiline">
          <div className="tile is-parent">
            <div className="tile is-child box">
              <label className='label'>Original Start Dates <strong>{new Date(formData.startDate).toLocaleDateString()}</strong></label>
              <label className='label'>Choose the new Start date</label>

              <Datepicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                isClearable
                placeholderText="Select start date"
                dateFormat='dd/MM/yyyy'
                className='input'
                // startDate={startDate}
                // endDate={endDate}
                inline
              />
            </div>
          </div>
          <div className="tile is-parent">
            <div className="tile is-child box">
              <label className='label'>Original End Date <strong>{new Date(formData.endDate).toLocaleDateString()}</strong></label>
              <label className='label'>Choose the new End Date</label>

              <Datepicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                isClearable
                placeholderText="Select end date"
                dateFormat='dd/MM/yyyy'
                className='input ml-2'
                inline
              />
            </div>
          </div>

        </div>
      </div> */}

      <button type='submit' className='button is-link'>Submit</button>
    </form>
  </div>

}

export default LocationForm
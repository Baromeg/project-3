const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true }
  },
  {
    timestamps: true
  }
)

const locationSchema = new mongoose.Schema({
  category: {
    type: [String],
    required: true,
    validate: (typesArray) => Array.isArray(typesArray) && typesArray.length > 0
  },
  name: { type: String, required: true },
  timings: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postcode: { type: String, required: true },
  longitude: { type: Number },
  latitude: { type: Number },
  website: { type: String },
  email: { type: String },
  phone: { type: String },
  bio: { type: String },
  image: { type: String },
  comments: [commentSchema],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})

locationSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Locations', locationSchema)

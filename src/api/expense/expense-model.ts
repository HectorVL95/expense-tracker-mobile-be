import { Schema, model } from 'mongoose';

const expense_model = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  photo: {
    type: String,
    required: false
  },
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date_created: {
    type: Date,
    default: Date.now()
  },
  location: {
    type: String,
    required: true
  }
})

export default model('Expense', expense_model)
import { Schema, model } from 'mongoose';

const expense_model = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
})

export default model('Expense', expense_model)
import { Schema, SchemaType, model } from 'mongoose';

const user_model = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tasks:[{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  date_created: {
    type: Date,
    default: Date.now()
  }

})

export default model('User', user_model)
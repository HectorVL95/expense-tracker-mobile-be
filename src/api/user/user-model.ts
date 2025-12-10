import { Document, Schema, SchemaType, model, HydratedDocument } from 'mongoose';
import expense_model from '../expense/expense-model';

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
  expenses:[{
    type: Schema.Types.ObjectId,
    ref: 'Expense'
  }],
  date_created: {
    type: Date,
    default: Date.now()
  }
})

expense_model.post('findOneAndDelete', async function (doc:HydratedDocument<any> | null) {
  if (!doc) return
  const User = model('User')

  await User.findByIdAndUpdate(doc.owner_id, {
    $pull: {expenses: doc._id}
  })
})

export default model('User', user_model)


import { Schema, model, HydratedDocument } from 'mongoose';

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
    required: false
  },
  date: {
    type: Date,
    required:true
  }
})

expense_model.post('save', async function() {
  const User = model('User')
  
  await User.findByIdAndUpdate(this.owner_id, {
    $addToSet: {expenses: this._id}
  })
})

expense_model.post('findOneAndDelete', async function (doc:HydratedDocument<any> | null) {
  if (!doc) return
  const User = model('User')

  await User.findByIdAndUpdate(doc.owner_id, {
    $pull: {expenses: doc._id}
  })
})

export default model('Expense', expense_model)


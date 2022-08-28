import mongoose from 'mongoose'
const { Schema, model } = mongoose

const NoteSchema = new Schema(
  {
    title: String,
    content: String,
    important: Boolean,
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
NoteSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id
    delete returnedObj._id
  }
})
export default model('Note', NoteSchema)

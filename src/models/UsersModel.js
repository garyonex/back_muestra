import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const { Schema, model } = mongoose
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    // aqui estamos asociando las notas con cada usuario
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Note'
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
)
UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id // para eliminar el _id que nos da por defecto el mongoose
    delete returnedObject.passwordHash // para que no regrese la contraseña
  }
})
UserSchema.plugin(uniqueValidator) // para que el campo sea unico
export default model('User', UserSchema)

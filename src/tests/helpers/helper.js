import supertest from 'supertest'
import { app } from '../../server.js'
export const api = supertest(app)
export const inicialNotes = [
  {
    title: 'Nota creada para test',
    content:
      'Nota que necesitamos para poder probar un test y que este nos demuestre su resultado'
  },
  {
    title: 'Nota creada para test numero 2 ',
    content:
      'Otra nota que estamos creaando para probar la funcionalidad del test mediante jest'
  }
]

// ? queda pendiente la refactorizacion del restante del test

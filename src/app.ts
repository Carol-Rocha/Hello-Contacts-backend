import 'express-async-errors'
import express, { Application } from 'express'
import { handleErros } from './errors/handleErros'
import { clientRoutes } from './routes/client.routes'
import { loginRoutes } from './routes/login.routes'
import { contactsRoutes } from './routes/contacts.routes'
import cors from 'cors'

export const app: Application = express()

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:5173'
  })
)

app.use('/clients', clientRoutes)
app.use('/login', loginRoutes)
app.use('/contacts', contactsRoutes)
app.use(handleErros)

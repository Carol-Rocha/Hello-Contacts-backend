import "express-async-errors"
import express, {Application} from "express"
import { handleErros } from "./errors/handleErros"
import { clientRoutes } from "./routes/client.routes"

export const app: Application = express()

app.use(express.json())
app.use("/clients", clientRoutes)
app.use(handleErros)
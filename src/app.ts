import "express-async-errors"
import express, {Application} from "express"
import { handleErros } from "./errors/handleErros"

export const app: Application = express()

app.use(express.json())
app.use(handleErros)
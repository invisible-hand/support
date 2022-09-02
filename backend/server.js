const express = require("express")
const dotenv = require("dotenv").config()
const {errorHandler} = require('./middleware/errorMiddleware')
const colors = require("colors")
const connectDB = require("./config/db")
const PORT = process.env.PORT || 5001

// connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false }))

app.get("/", (req, res) => {
    res.send("hello")
})

// Routes
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/tickets", require("./routes/ticketRoutes"))

app.use(errorHandler)

app.listen(PORT, () => console.log(`server started on ${PORT}`))

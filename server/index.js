require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const phonesRouter = require('./routes/phones')

const app = express()
const PORT = process.env.PORT

app.use(express.json({ limit: '10mb' }))
app.use(cors({ origin: 'http://localhost:3000' }))

app.use('/phones', phonesRouter)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch ( e ) {
        console.log(e)
    }
}

start()
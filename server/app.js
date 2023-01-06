// dashboard
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')
const { EventSchema } = require('./models/Event.js')

const express = require('express')

// dashboard
const PORT = 3000

// database
const mongoose = require('mongoose')

const {connectDB} = require('./config/database.js')
AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
})


const start = async () => {
    const app = express()

    // await mongoose.connect("mongodb://127.0.0.1:27017/")
    await connectDB();
    const adminOptions = {
        // We pass Event to `resources`
        resources: [EventSchema],
    }
    // Please note that some plugins don't need you to create AdminJS instance manually,
    // instead you would just pass `adminOptions` into the plugin directly,
    // an example would be "@adminjs/hapi"
    const admin = new AdminJS(adminOptions)

    const adminRouter = AdminJSExpress.buildRouter(admin)
    app.use(admin.options.rootPath, adminRouter)

    app.listen(PORT, () => {
        console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
        console.log(process.env.DB_STRING)
        console.log(Event)
    })
}


start()
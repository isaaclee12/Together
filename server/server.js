const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

// AdminJS Stuff
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')
const Event = require('./models/Event.js') 
const User = require('./models/User.js') 
const PORT = 5000;
AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
})


const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const eventsRoutes = require("./routes/events");

// Passport config
require("./config/passport")(passport);

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Render React as View
app.use(express.static(path.join(__dirname, "..", "client", "build")));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/events", eventsRoutes);
app.get("'", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
})







//Connect To Database
connectDB().then(() => {
  //Server Running
  app.listen(process.env.PORT, () => {
    console.log(
      `Server is running on ${process.env.PORT}, you better catch it!`
    );
  });

});


const start = async () => {
    const app = express()

    // await mongoose.connect("mongodb://127.0.0.1:27017/")
    // await connectDB();
    console.log(Event);

    const adminOptions = {
        // We pass Event to `resources`
        resources: [Event, User],
    }
    // Please note that some plugins don't need you to create AdminJS instance manually,
    // instead you would just pass `adminOptions` into the plugin directly,
    // an example would be "@adminjs/hapi"
    const admin = new AdminJS(adminOptions)

    const adminRouter = AdminJSExpress.buildRouter(admin)
    app.use(admin.options.rootPath, adminRouter)

    app.listen(PORT, () => {
        console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
    })
}

start();






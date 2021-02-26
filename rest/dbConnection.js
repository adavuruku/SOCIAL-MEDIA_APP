require('dotenv').config();
const mongoose = require('mongoose');
//get the environment you are working on
//i prefer to use mongo compass for local dev
//mongo atlas for online db
var devState = process.env.NODE_ENV
//connect to db
let dbUtils = async()=>{
    try {
        let conUrl =( devState == 'production') ? process.env.MONGO_LIVE_CON : process.env.MONGO_LOCAL_CON
        let mongoo = await mongoose.connect(conUrl,
            { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState, conUrl);
        return mongoo
    } catch (error) {
        console.log("DB Connection Error: ", error);
    }
}
module.exports = dbUtils();
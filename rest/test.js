// const mongoose = require('mongoose');
// const con = require('./dbConnection');

// //establish connection to database
// mongoose.connect(
    
//     // 'mongodb+srv://<username>:<password>@cluster0.eetsx.mongodb.net/<dbname>',
//     // 'mongodb+srv://millewise:millewise@cluster0.rxrtp.mongodb.net/test?retryWrites=true&w=majority',
//     'mongodb://localhost:27017/millewiseDB',
//     { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true},
//     (err) => {
//         if (err) return console.log("Error: ", err);
//         console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
//     }
// );


/*const dbConfig = module.exports = {
    // url: 'mongodb://localhost:27017/myzullip'
    url: conUrl
};

mongoose.Promise = global.Promise;


Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false 
}).then(() => {
    console.log("Successfully connected to the database", conUrl);    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});*/


// let mongoose = await mongoose.connect(
//     conUrl,
//     { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true},
//     (err) => {
//         if (err) return console.log("Error: ", err);
//         console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
//     }
// );
// module.exports = mongoose;

// let h = [2,6,7,8,9,2,1].filter(ele=> ele> 3)
// console.log(h)

// let k = [{one:"one", id:"id1"},{one:"one", id:"id1"}]
// let g = ["Singing", "Dancing"]
// let r = [...new Set([...k.one,...g])]
// console.log(r)

// let h = j = m  = "kk"

// h = "well"
// console.log(h)

h = [2,4,5,6,7]
h.shift(-1)
g = h.map(j=>{j==2})
console.log(h)
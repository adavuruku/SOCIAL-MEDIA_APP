const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors')
// const fileUpload = require('express-fileupload')

const app = express();

app.use(cors());
// app.use(fileUpload({useTempFiles:true}))
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//database connection
const con = require('./dbConnection');

//main route root
const usersRoutes = require('./app/routes/userRoute');
const statisticRoutes = require('./app/routes/statisticRoute');

app.use('/api/user',usersRoutes);
// app.use('/api/stat',statisticRoutes);

app.use((error, req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error : {
            message: error.message
        }
    });
});

/**
 * mongoose options explain 
 * safe:true|false - should error be reported
 * new:true|false - should update return the update record
 * upsert:true|false - should find it or insert
 * $push - add new element to arrray not minding the set
 * $addToset : add unique elements
 */
module.exports = app;

//search deep into array of objects fekong@seamfix.com
// router.route("/find").get(function(req, res) {
//     football.find(
//       { "awards.award": "Golden Boot", "awards.numberOfTimes": 6 },
//       function(err, result) {
//         if (err) {
//           res.send(err);
//         } else {
//           res.json(result);
//         }
//       }
//     );
//   });

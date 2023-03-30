const bodyParser= require('body-parser')

const express = require('express');
const app = express();
console.log("ok");
// set our port
var mongoose = require('mongoose');
const port = 3000;
// config files

app.use(bodyParser.urlencoded({ extended: true }))

var db = require ( './config/db' );
console . log ( "connecting--" , db );

mongoose . connect ( db . url ); //Mongoose connection created

app.get('/', 

//(req, res) => res.send('Welcome to Tutorialspoint!')
(req, res) =>res.sendFile(__dirname + '/index.html')

);
//defining route
//app.get('/tproute', function (req, res) {
//res.send('This is routing for the application developed using Node and Express...
//});
// startup our app at http://localhost:3000

var Student = require ( './models/student' );
async function getItems(){
        
    const Items = await Student.find({});
    return Items;
  
  }
app.get('/api/students', async (req, res) => {
    getItems().then(function(FoundItems){
              
        res.send(FoundItems);
    
    
});
});
app.post('/api/students/send', function (req, res) {
  var student = new Student(); // create a new instance of the student model
  student.name = "another"; // set the student name (comes from the request)
  student.save(function(err) {
  if (err)
  res.send(err);
  res.json({ message: 'student created!' });
  });
  });


app.post('/quotes', (req, res) => {
   // var student = new Student(); // create a new instance of the student model
//   var item= req.body.name; //ody set the student name (comes from the request)
//   student.save(item, function (err, result) {
    
//     console.log('item has been inserted');
//     db.close;
// });
// });
const student= new Student({
  name: req.body.name
});

student.save().then(()=>{
  res.redirect('/api/students');
}).catch((err)=>{
  console.log("kuch err hai ");
  console.log(err);
})

})
app.delete('/quotes/:id', (req,res) => {
  const id = req.params.id
  // await User.findByIdAndRemove(id).exec()
  // res.send('Deleted')
  console.log(id);
})
// console.log(req.body)
// student.insertOne(req.body)
//     .then(result => {
//       console.log(result)
//     })
//     .catch(error => console.error(error))

  //   exports.insertOne = function(req, res) {
  //     var emp = new Student(req.body);
  //     emp.save(function(err, result) {
  //       if (err)
  //         res.send(err);
  //       res.json(result);
  //     });
  //   };
  // });


app.listen(port, ()=> console.log(`Example app listening on port ${port}!`));

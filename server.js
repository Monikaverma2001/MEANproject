const bodyParser= require('body-parser')

const express = require('express');
const app = express();
console.log("ok");
// set our port
var mongoose = require('mongoose');
const port = 8000;
// config files

app.use(bodyParser.urlencoded({ extended: true }))
app.engine('html', require('ejs').renderFile);
var db = require ( './config/db' );
const Faculity = require('./models/faculity');
console . log ( "connecting--" , db );

mongoose . connect ( db . url ); //Mongoose connection created

app.get('/', 

//(req, res) => res.send('Welcome to Tutorialspoint!')
(req, res) =>res.sendFile(__dirname + '/view/home.html')

);
app.get('/login', 

//(req, res) => res.send('Welcome to Tutorialspoint!')
(req, res) =>res.sendFile(__dirname + '/view/index.html')

);
app.get('/logo', 

//(req, res) => res.send('Welcome to Tutorialspoint!')
(req, res) =>res.sendFile(__dirname + '/images/logo.jpg')

);
//defining route
//app.get('/tproute', function (req, res) {
//res.send('This is routing for the application developed using Node and Express...
//});
// startup our app at http://localhost:3000

var Student = require ( './models/student' );
async function getItems(){
        
    const Items = await Faculity.find({});
    return Items;
  
  }
app.get('/faculity', async (req, res) => {
 Faculity.find({}).then(function(FoundItems){
              
        res.json(FoundItems);
    
    });
});
app.get('/student', async (req, res) => {
  Student.find({}).then(function(FoundItems){
            
      res.json(FoundItems);
  
  });
});


app.post('/login', async (req, res) => {
  let name=req.body.name;
  let password=req.body.password;
  //var position=Faculity.findOne(name).position;
  Faculity.find({name,password}).then(function(FoundItems){
        if(FoundItems==null)
        {
          res.sendFile(__dirname + '/view/home.html')
        } 
        else   
        {
          var v=Object.values(FoundItems);
          var position=(v['0']['position']);

         if(position=="true")
         {

              res.redirect('/faculityview')
         }
         else{
          res.redirect('/mentorview')
         }
         
        }
  
  });
});
app.post('/search', async (req, res) => {
  let name=req.body.name;
  Faculity.findOne({name}).then(function(FoundItems){
        if(FoundItems==null)
        {
          res.sendFile(__dirname + '/view/home.html')
        } 
        else   
      res.render(__dirname + '/view/hodview/crud.html');
  
  });
});
app.get('/student/search', async (req, res) => {
  let semester=req.body.semester;
  Student.findOne({semester}).then(function(FoundItems){
    res.redirect('/mentorview');
  });
});


app.post('/save', (req, res) => {
const faculity= new Faculity({
  name: req.body.name,
   password:req.body.password,
  position:req.body.position
});

faculity.save().then(()=>{
  res.redirect('/faculityview');
}).catch((err)=>{
  console.log("kuch err hai ");
  console.log(err);
})
})
app.post('/student/save', (req, res) => {
const student= new Student({
 name: req.body.name,
  phone:req.body.phone,
  semester:req.body.semester,
    comment:req.body.comment,
    mentor:req.body.mentor

});

student.save().then(()=>{
 res.redirect('/mentorview');
}).catch((err)=>{
 console.log("kuch err hai ");
 console.log(err);
})

})





app.post('/delete',function(req,res){

  var name=req.body.name;
  var position=req.body.position;
  Faculity.deleteOne({name,position}).then(()=>{
    res.redirect('/faculityview');
    
  }).catch((err)=>{
    console.log("kuch err hai ");
    console.log(err);
  })

})
app.post('/student/delete',function(req,res){

  var name=req.body.name;
  
  Student.deleteOne({name}).then(()=>{
    res.redirect('/mentorview');
    
  }).catch((err)=>{
    console.log("kuch err hai ");
    console.log(err);
  })

})




app.get('/faculityview',function(req,res){
  
  var items=Faculity.find({}).then(function(FoundItems){
    res.render(__dirname+'/view/hodview/crud.html',{name:FoundItems})
  })
  
});
app.get('/mentorview',function(req,res){
  var items=Student.find({}).then(function(FoundItems){
    res.render(__dirname+'/view/mentorview/crud.html',{name:FoundItems})
  })
});


app.get('/first',
(req, res) =>res.sendFile(__dirname + '/images/first.jpeg')
)
app.get('/second',
(req, res) =>res.sendFile(__dirname + '/images/second.jpg')
)

app.get('/third',
(req, res) =>res.sendFile(__dirname + '/images/third.jpg')
)


app.listen(port, ()=> console.log(`Example app listening on port http://localhost:${port}/`));

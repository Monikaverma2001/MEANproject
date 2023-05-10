const bodyParser= require('body-parser')

const express = require('express');
const app = express();
const cors=require('cors');
app.use(cors());
console.log("ok");
// set our port
var mongoose = require('mongoose');

      

        const path = require('path');
        var fs = require('fs');
        var multer = require('multer');
        const imgSchema = require('./models/model');
        var storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'uploads')
            },
            filename: (req, file, cb) => {
                cb(null, file.fieldname + '-' + Date.now())
            }
        });
         
        var upload = multer({ storage: storage });


const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }))
app.engine('html', require('ejs').renderFile);
var db = require ( './config/db' );
const Faculity = require('./models/faculity');
const Msg= require('./models/msg');
const Event = require('./models/events');

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
  var items=Student.find({}).then(function(FoundItems){
    var mentor=Faculity.find({position:true}).then(function(i){
      res.render(__dirname+'/view/data.html',{name:FoundItems,mentor:i,name2:null})

    })
      })
});

app.post('/login', async (req, res) => {
  let name=req.body.name;
  let password=req.body.password;
  //var position=Faculity.findOne(name).position;
  Faculity.findOne({name}).then(function(FoundItems){
    console.log(FoundItems.position)
    var position=FoundItems.position;
    var id=FoundItems.id;
        if(FoundItems==null)
        {
          res.sendFile(__dirname + '/view/home.html')
        } 
        else   if(FoundItems.password===password)
        {
          
         if(position=="true")
         {
         
              res.redirect(`/faculityview`)
         }
         else{
          res.redirect(`/mentorview/:${id}`)
         }
         
        }
        else{
          res.send("enter a valid password");
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

var objectId = require("mongodb").ObjectId;
app.use(require("express-session")({
  secret: "Rusty is a dog",
  resave: false,
  saveUninitialized: false
}));



const hodController=require('./controller/hodController')
const mentorController=require('./controller/mentorController')


//app.post('/save',hodController.insertfaculity);

app.post('/delete',hodController.deletefaculity);
app.post('/student/delete',mentorController.deletestudent);
app.get('/student/search',mentorController.searchAll);
app.post('/searchStudent',mentorController.searchStudent);
app.post('/searchBysem',mentorController.searchStudentSem);

app.post('/delete:id',(req,res)=>
{
  var id=req.params.id;
  id=id.slice(1, id.length);
  console.log(id);
  Faculity.findByIdAndDelete(new objectId(id)).then(()=>{
    res.redirect('/faculityview');
    
  }).catch((err)=>{
    console.log("kuch err hai ");
    console.log(err);
  });
});
app.get('/faculityview',function(req,res){
  console.log(req.params.name);
  var sem=req.body.semester;
 var event=Event.find({}).then(function(events){
  var items=Faculity.find({}).then(function(FoundItems){
    var it=Student.find({semester:sem}).then(function(i)
    {
      var msg=Msg.find({}).sort({_id:-1}).limit(10).then(function(msg){
        var mentor=Faculity.find({position:false}).then(function(m){
          res.render(__dirname+'/view/hodview/crud.html',{msgs:msg,name:FoundItems,name2:i,events:events,mentor:m})
  
        })
      })
      
    })
      })
    });
  
});
app.post('/searchByName',function(req,res){
  var n=req.body.name;
  var event=Event.find({}).then(function(events){
  var items=Faculity.find({}).then(function(FoundItems){
    var it=Student.find({name:n}).then(function(i)
    {
      res.render(__dirname+'/view/hodview/crud.html',{name:FoundItems,name2:i,events:events})

    })
      })
    })
   
});
app.post('/faculityview',function(req,res){
  var sem=req.body.semester;
  console.log(req.params.id);
  var na=req.body.name;
  var event=Event.find({}).then(function(events){
  var items=Faculity.find({}).then(function(FoundItems){
    var it=Student.find({semester:sem}).then(function(i)
    {
      var msg=Msg.find({}).sort({_id:-1}).limit(10).then(function(msg){
        var mentor=Faculity.find({position:false}).then(function(m){
          res.render(__dirname+'/view/hodview/crud.html',{msgs:msg,name:FoundItems,name2:i,events:events,mentor:m})
  
        })
      })
     
      
    })
  })
})
});
app.get('/mentorview/:id',function(req,res){
  var id=req.params.id;
id= id.slice(1,id.length);
  var m=Faculity.findOne({id:id});
 // console.log(m);
  var event=Event.find({}).then(function(events){
  var items=Student.find({}).then(function(FoundItems){
    var mentor=Faculity.find({position:false}).then(function(i){
      var msg=Msg.find({}).sort({_id:-1}).limit(10).then(function(msg){
      res.render(__dirname+'/view/mentorview/crud.html',{msgs:msg,name2:null,mentor:i,events:events,m:id})

    })
  })
      })
    })
});
app.post('/mentorview',function(req,res){
  var sem=req.body.semester;
  var event=Event.find({}).then(function(events){
  var items=Student.find({semester:sem}).then(function(FoundItems){
    var mentor=Faculity.find({position:false}).then(function(i){
      var msg=Msg.find({}).sort({_id:-1}).limit(10).then(function(msg){
      res.render(__dirname+'/view/mentorview/crud.html',{msgs:msg,name2:FoundItems,mentor:i,events:events,m:null})

    })
  })
      })
    })
});
app.post('/addevent',(req,res)=>{
 
    const events= new Event({
      title: req.body.title,
      discription: req.body.discription,
      start: req.body.start,
       end: req.body.end,
       date:Date()
    });
    events.save();
    
})
app.get('/extend',(req,res)=>{

  Student.updateMany(
    {},
    {$inc:{semester:1}}
   ).then(()=>{
   
    res.redirect('/faculityview');
   })
})
app.get('/waste',(req,res)=>{
  Student.deleteMany({semester:{$gt:8}}).then(function(items){
    res.send(items);
  })
})
app.post('/addmsg',(req,res)=>{
 
  const msg= new Msg({
   msg: req.body.msgs,
   date:new Date()
  });
  msg.save();
  res.redirect('/faculityview')
})
app.get('/addfaculity',(req,res)=>{
  res.render(__dirname+'/public/views/addfaculity.html')

})
app.post('/studelete',(req,res)=>{
  var id=req.body.id;
  
   Student.findByIdAndDelete(new objectId(id)).then(()=>{
       res.redirect('/faculityview')
;  })
  // Event.findByIdAndDelete({name});
})
app.post('/eventdelete',(req,res)=>{
  var id=req.body.id;
  
   Event.findByIdAndDelete(new objectId(id)).then(()=>{
       res.redirect('/faculityview')
;  })
  // Event.findByIdAndDelete({name});
})
app.post('/msgdelete',(req,res)=>{
  var id=req.body.id;
  
   Msg.findByIdAndDelete(new objectId(id)).then(()=>{
       res.redirect('/faculityview')
;  })
  // Event.findByIdAndDelete({name});
})
app.get("/update/:id", async (req, res) => {
  var id=req.params.id;
  id=id.slice(1, id.length);
 // console.log(id);
  res.render(__dirname+'/public/views/update.html',{name:id})

});
app.post("/edit/:id", async (req, res) => {
  var id=req.params.id;
  id=id.slice(1, id.length);
  console.log(id);
  var ph=req.body.phone;
  Faculity.findByIdAndUpdate(new objectId(id),{phone:ph}).then(()=>{
    res.redirect('/faculityview');
    
  }).catch((err)=>{
    console.log("kuch err hai ");
    console.log(err);
  });
});
app.post('/show',function(req,res){
    var name=req.body.mentor;
    console.log(name);
  })

  app.post('/savecomment/:id',async (req, res) => {
    var id=req.params.id;
    id=id.slice(1, id.length);
   
    var comment=req.body.comment;
    
     var pre=Student.findById(new objectId(id)).comment;console.log(pre);
     comment=pre+comment; 
    Student.findByIdAndUpdate(new objectId(id),{comment:comment}).then(()=>{
     
      
    }).catch((err)=>{
      console.log("kuch err hai ");
      console.log(err);
    });
  }
    )

app.get('/imageadd',(req,res)=>
{
  imgSchema.find({})
  .then((data, err)=>{
      if(err){
          console.log(err);
      }
      res.render(__dirname+'/view/images.html',{items: data})
  })
 
})
app.post('/imageadd', upload.single('image'), (req, res, next) => {
 
  var obj = {
      name: req.body.name,
      desc: req.body.desc,
      img: {
          data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
          contentType: 'image/png'
      }
  }
  imgSchema.create(obj)
  .then ((err, item) => {
      if (err) {
        console.log("kuch error hai");
          console.log(err);
      }
      else {
          // item.save();
          
          res.redirect('/');
      }
  });
});

app.post('/save', upload.single('image'), (req, res, next)=> {
 
  var obj={
    img: {
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
      contentType: 'image/png'
  },
    name: req.body.name,
     password:req.body.password,
    position:req.body.position,
    phone:req.body.phone
  };
  Faculity.create(obj)
  .then ((err, item) => {
     res.redirect('/faculityview');
     
  });
})
app.post('/student/save', upload.single('image'), (req, res, next)=> {
 
  var obj = {
      urn:req.body.urn,
  name: req.body.name,
   phone:req.body.phone,
   semester:req.body.semester,
     comment:req.body.comment,
     mentor:req.body.mentor,
      img: {
          data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
          contentType: 'image/png'
      }
  }
  Student.create(obj)
  .then ((err, item) => {
     res.redirect('/mentorview');
     
  });
})
app.use(express.static(path.join(__dirname, 'public')))
app.listen(port, ()=> console.log(`Example app listening on port http://localhost:${port}/`));

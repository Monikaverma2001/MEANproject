const bodyParser= require('body-parser')

const express = require('express');
const app = express();
const cors=require('cors');
app.use(cors());
console.log("ok");
// set our port
let login=0;
const route=require('./routes/faculity');

app.use(route);
const bcrypt=require('bcryptjs')
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
(req, res) =>{
  login=0;
  res.sendFile(__dirname + '/view/index.html')
}

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
  login=0;
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
              login=id;
              res.redirect(`/faculityview/:${id}`)
         }
         else{
              login=id;
              console.log(id);
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

//app.post('/delete',hodController.deletefaculity);
app.post('/student/delete',mentorController.deletestudent);
app.get('/student/search',mentorController.searchAll);
app.post('/searchStudent',mentorController.searchStudent);
app.post('/searchBysem',mentorController.searchStudentSem);

app.post('/faculityview/:id/delete:Id',(req,res)=>
{
  var Id=req.params.Id;
  Id=Id.slice(1, Id.length);
  var id=req.params.id;
  id=id.slice(1, id.length);
 console.log(id);
 console.log(Id);
  Faculity.findByIdAndDelete(new objectId(Id)).then(()=>{
    login=id;
    res.redirect(`/faculityview/:${id}`)
    
  }).catch((err)=>{
    console.log("kuch err hai ");
    console.log(err);
  });
});
app.get('/faculityview/:id',function(req,res){
  var id=req.params.id;
  id=id.slice(1, id.length);
  if(login==id){
  var sem=req.body.semester;
 var event=Event.find({}).then(function(events){
  var items=Faculity.find({}).then(function(FoundItems){
    var it=Student.find({semester:sem}).then(function(i)
    {
      var msg=Msg.find({}).sort({_id:-1}).limit(10).then(function(msg){
        var mentor=Faculity.find({position:false}).then(function(m){
          res.render(__dirname+'/view/hodview/crud.html',{msgs:msg,name:FoundItems,name2:null,events:events,mentor:m,id:id})
  
        })
      })
      
    })
      })
    });
  }
  else{
    res.redirect('/login');
  }
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
app.post('/faculityview/:id',function(req,res){
  var id=req.params.id;
  id=id.slice(1, id.length);
  if(login==id){
  var sem=req.body.semester;
 
  var na=req.body.name;
  var event=Event.find({}).then(function(events){
  var items=Faculity.find({}).then(function(FoundItems){
    var it=Student.find({semester:sem}).then(function(i)
    {
      var msg=Msg.find({}).sort({_id:-1}).limit(10).then(function(msg){
        var mentor=Faculity.find({position:false}).then(function(m){
          res.render(__dirname+'/view/hodview/crud.html',{msgs:msg,name:FoundItems,name2:i,events:events,mentor:m,id:id})
  
        })
      })
     
      
    })
  })
})
  }
  else{
    res.redirect('/login');
  }
});
app.get('/mentorview/:id',function(req,res){
  var id=req.params.id;
  id= id.slice(1,id.length);
  console.log(id);
  if(login==id){
 
 
 // console.log(m);
  var event=Event.find({}).then(function(events){
  var items=Student.find({}).then(function(FoundItems){
    var mentor=Faculity.find({position:false}).then(function(i){
      var msg=Msg.find({}).sort({_id:-1}).limit(10).then(function(msg){
        var p=Faculity.findById(new objectId(id)).then(function(p)
        {
          
          res.render(__dirname+'/view/mentorview/crud.html',{msgs:msg,name2:null,mentor:i,events:events,m:p})

        })
      
    })
  })
      })
    })
  }
  else{
    res.redirect('/login');
  }
});
app.post('/mentorview/:id',function(req,res){
  var id=req.params.id;
  id= id.slice(1,id.length);
    var m=Faculity.findOne({id:id});
  var sem=req.body.semester;
  var event=Event.find({}).then(function(events){
  var items=Student.find({semester:sem}).then(function(FoundItems){
    var mentor=Faculity.find({position:false}).then(function(i){
      var msg=Msg.find({}).sort({_id:-1}).limit(10).then(function(msg){
        var p=Faculity.findById(new objectId(id)).then(function(p)
        {
          
      res.render(__dirname+'/view/mentorview/crud.html',{msgs:msg,name2:FoundItems,mentor:i,events:events,m:p})

    })
    })
  })
      })
    })
});
app.post('/addevent/:id',(req,res)=>{
 var id=req.params.id;
 id=id.slice(1,id.length);
    const events= new Event({
      title: req.body.title,
      discription: req.body.discription,
      start: req.body.start,
       end: req.body.end,
       date:Date()
    });
    events.save();
    res.redirect(`/faculityview/:${id}`)
})
app.get('/extend/:id',(req,res)=>{
  var id=req.params.id;
  id=id.slice(1,id.length);
  Student.updateMany(
    {},
    {$inc:{semester:1}}
   ).then(()=>{
   
    res.redirect(`/faculityview/:${id}`)
   })
})
app.get('/waste',(req,res)=>{
  var id=req.params.id;
  id=id.slice(1,id.length);
  Student.deleteMany({semester:{$gt:8}}).then(function(items){
    res.redirect(`/faculityview/:${id}`)
  })
})
app.post('/addmsg/:id',(req,res)=>{
  var id=req.params.id;
  id=id.slice(1,id.length);
  const msg= new Msg({
   msg: req.body.msgs,
   date:new Date()
  });
  msg.save();
  res.redirect(`/faculityview/:${id}`)
})
app.get('/addfaculity',(req,res)=>{
  res.render(__dirname+'/public/views/addfaculity.html')

})
app.post('/studelete/:id',(req,res)=>{
  var Id=req.body.id;
  var id=req.params.id;
  id=id.slice(1,id.length);
   Student.findByIdAndDelete(new objectId(Id)).then(()=>{
    res.redirect(`/faculityview/:${id}`)
;  })
  // Event.findByIdAndDelete({name});
})
app.post('/eventdelete/:id',(req,res)=>{
  var Id=req.body.id;
  var id=req.params.id;
  id=id.slice(1,id.length);
   Event.findByIdAndDelete(new objectId(Id)).then(()=>{
    res.redirect(`/faculityview/:${id}`)
;  })
  // Event.findByIdAndDelete({name});
})
app.post('/msgdelete/:id',(req,res)=>{
  var Id=req.body.id;
  var id=req.params.id;
  id=id.slice(1,id.length);
   Msg.findByIdAndDelete(new objectId(Id)).then(()=>{
    res.redirect(`/faculityview/:${id}`)
;  })
  // Event.findByIdAndDelete({name});
})
app.get("/faculityview/:id/update/:Id", async (req, res) => {
  var Id=req.params.Id;
  Id=Id.slice(1, Id.length);
  var id=req.params.id;
  id=id.slice(1, id.length);
 // console.log(id);
  res.render(__dirname+'/public/views/update.html',{Id:Id,id:id})

});
app.post("/faculityview/:id/edit/:Id", async (req, res) => {
  var Id=req.params.Id;
  Id=Id.slice(1, Id.length);
  var id=req.params.id;
  id=id.slice(1, id.length);
  console.log(id);
  console.log(Id);
  var ph=req.body.phone;
  Faculity.findByIdAndUpdate(new objectId(Id),{phone:ph}).then(()=>{
    res.redirect(`/faculityview/:${id}`)
    
  }).catch((err)=>{
    console.log("kuch err hai ");
    console.log(err);
  });
});
app.post("/stuedit/:id", async (req, res) => {

  var id=req.params.id;
  id=id.slice(1, id.length);
  var Id=req.body.urn;
 console.log(id);
 console.log(login);
   
var name= req.body.name;
var phone=req.body.phone;
var semester=req.body.semester;
 var comment=req.body.comment;
  var mentor=req.body.mentor
  
  Student.findOneAndUpdate({urn:Id},{name:name,phone:phone,semester:semester,comment:comment,mentor:mentor}).then(()=>{
    res.redirect(`/faculityview/:${id}`)
    
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

app.post('/save/:id', upload.single('image'), async (req, res, next)=> {
  var id=req.params.id;
  id=id.slice(1, id.length);
//  let salt= await bcrypt.genSalt(10);
//  let hashp= await bcrypt.hash(req.body.password,salt);
  var obj={
    img: {
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
      contentType: 'image/png'
  },
    name: req.body.name,
  //  password:hashp,
    password:req.body.password,
    position:req.body.position,
    phone:req.body.phone
  };
  Faculity.create(obj)
  .then ((err, item) => {
    res.redirect(`/faculityview/:${id}`)
     
  });
})
app.post('/student/save/:id', upload.single('image'), (req, res, next)=> {
  var id=req.params.id;
  id=id.slice(1, id.length);
 
  var obj = {
      urn:req.body.urn,
  name: req.body.name,
   phone:req.body.phone,
   semester:req.body.semester,
     comment:req.body.comment,
     mentor:req.body.mentor,
     
  }
  Student.create(obj)
  .then ((err, item) => {
    res.redirect(`/faculityview/:${id}`)
     
  });
});
// const nodemailer = require("nodemailer");
// const transporter = nodemailer.createTransport(config.mailAuth);
  
// app.get('forgot',(req,res)=>{
  
//   const sendOTP = (to, otp) => {
//   return new Promise(async (resolve, reject) => {
//       try {
//       if (to === "undefined" && typeof otp == "undefined") {
//           return new Error("invalid input for email");
//       }
//       const emailTemplate = await ejs.renderFile(otpTemaplte, {
//           VERIFICATION_CODE: otp,
//       });
//       const result = await transporter.sendMail({
//           from: "noreply@mail.com",
//           to: to,
//           subject: "OTP for email verification",
//           html: emailTemplate,
//       });
//       if (result) {
//           return resolve(result);
//       }
//       } catch (error) {
//       return reject(error);
//       }
//   });
//   };
// })



app.use(express.static(path.join(__dirname, 'public')))
app.listen(port, ()=> console.log(`Example app listening on port http://localhost:${port}/`));

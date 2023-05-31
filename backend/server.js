const express = require('express');
const app = express();
const cors=require('cors');
app.use(cors());

const route=require('./routes');
const controller=require('./controller')
const bodyParser= require('body-parser')
var login=0;
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

app.use('/',route);
//defining route
//app.get('/tproute', function (req, res) {
//res.send('This is routing for the application developed using Node and Express...
//});
// startup our app at http://localhost:3000


async function getItems(){
        
    const Items = await Faculity.find({});
    return Items;
  
  }
// app.get('/faculity',controller.hodview);



app.use('/login', route);
app.use('/loginp',route);
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

var Student = require('./models/student');
app.use('/faculityview/:id/delete:Id',route);
app.use('/faculityview/:id',route);

app.use('/faculityview/:id',route);
app.use('/mentorview/:id',route);
app.use('/mentorview/:id',route);

app.use('/addevent/:id',route);
app.use('/extend/:id',route);

app.use('/addmsg/:id',route);
app.use('/addfaculity',route);
app.use('/studelete/:id',route);
app.use('/eventdelete/:id',route);
app.use('/msgdelete/:id',route);
app.use("/faculityview/:id/update/:Id", route);
app.use("/faculityview/:id/edit/:Id",route);
app.use("/stuedit/:id",route);
app.post('/student/save/:id', upload.single('image'), (req, res, next)=> {
  var id=req.params.id;
  id=id.slice(1, id.length);
 login=id
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

app.post('/save/:id', upload.single('image'), async (req, res, next)=> {
  var id=req.params.id;
  id=id.slice(1, id.length);
//  let salt= await bcrypt.genSalt(10);
//  let hashp= await bcrypt.hash(req.body.password,salt);
login=id;
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

app.get('/api/getData', async (req, res) => {
  var items=Student.find({}).then(function(FoundItems){
    var mentor=Faculity.find({position:true}).then(function(i){
      console.log(FoundItems);
          res.send(FoundItems)
      

    })
      })
})
app.get('/student', async (req, res) => {
  var items=Student.find({}).then(function(FoundItems){
    var mentor=Faculity.find({position:true}).then(function(i){
      res.render(__dirname+'/view/data.html',{name:FoundItems,mentor:i,name2:null})

    })
      })
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

// app.get('/imageadd',(req,res)=>
// {
//   imgSchema.find({})
//   .then((data, err)=>{
//       if(err){
//           console.log(err);
//       }
//       res.render(__dirname+'/view/images.html',{items: data})
//   })
 
// })
// app.post('/imageadd', upload.single('image'), (req, res, next) => {
 
//   var obj = {
//       name: req.body.name,
//       desc: req.body.desc,
//       img: {
//           data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//           contentType: 'image/png'
//       }
//   }
//   imgSchema.create(obj)
//   .then ((err, item) => {
//       if (err) {
//         console.log("kuch error hai");
//           console.log(err);
//       }
//       else {
//           // item.save();
          
//           res.redirect('/');
//       }
//   });
// });
//model database of student

//model databaseof faculity



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





// const hodController=require('./controller/hodController')
// const mentorController=require('./controller/mentorController')


//app.post('/save',hodController.insertfaculity);

//app.post('/delete',hodController.deletefaculity);

// app.post('/student/delete',mentorController.deletestudent);
// app.get('/student/search',mentorController.searchAll);
// app.post('/searchStudent',mentorController.searchStudent);
// app.post('/searchBysem',mentorController.searchStudentSem);



app.use(express.static(path.join(__dirname, 'public')))
 app.listen(port, ()=> console.log(`Example app listening on port http://localhost:${port}/`));
//module.exports=app;
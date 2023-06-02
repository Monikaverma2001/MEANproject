//model database of student
var Student = require('./models/student');
//model databaseof faculity
var Faculity = require('./models/faculity');
//get request of logIn 
var login = 0;
const Msg= require('./models/msg');
const Event = require('./models/events');
var objectId = require("mongodb").ObjectId;
exports.home= (req, res) =>{res.redirect('\login')}

      


exports.logging = (req, res)=>  {
    login = 0;
    res.sendFile(__dirname + '/view/index.html')
}


//get request of hod view
exports.hodview = async (req, res) => {
    Faculity.find({}).then(function (FoundItems) {

        res.json(FoundItems);

    });
}


//post request of login
exports.postlogin = async (req, res) => {

    login = 0;
    // val
    let name = req.body.name;
    let password = req.body.password;
    console.log(name + " ");
    //var position=Faculity.findOne(name).position;
    Faculity.findOne({ name: name }).then(function (FoundItems) {

        if (FoundItems == null) {
            res.redirect('/login');
        }
        else if (FoundItems.password === password) {
            var position = FoundItems.position;

            var id = FoundItems.id;
           
            if (position == "true") {
                // console.log(FoundItems.position)
                login = id;
                res.redirect(`/faculityview/:${id}`)
            }
            else {
                login = id;
                console.log(id);
                res.redirect(`/mentorview/:${id}`)
            }

        }
        else {
            res.send("enter a valid password");
        }

    });
}


//hodview param id delte faculity
exports.hodparamsds = function(req, res){
    var Id = req.params.Id;
    Id = Id.slice(1, Id.length);
    var id = req.params.id;
    id = id.slice(1, id.length);
    console.log(id);
    console.log(Id);
    Faculity.findByIdAndDelete(new objectId(Id)).then(() => {
        login = id;
        res.redirect(`/faculityview/:${id}`)

    }).catch((err) => {
        console.log("kuch err hai ");
        console.log(err);
    });
}

//hod view with id search by student semester
exports.hodparams = function (req, res) {
    var id = req.params.id;
    id = id.slice(1, id.length);
    if (login == id) {
        var sem = req.body.semester;
        var event = Event.find({}).then(function (events) {
            var items = Faculity.find({}).then(function (FoundItems) {
                var it = Student.find({ semester: sem }).then(function (i) {
                    var msg = Msg.find({}).sort({ _id: -1 }).limit(10).then(function (msg) {
                        var mentor = Faculity.find({ position: false }).then(function (m) {
                            res.render(__dirname + '/view/hodview/crud.html', { msgs: msg, name: FoundItems, name2: null, events: events, mentor: m, id: id ,an:null})

                        })
                    })

                })
            })
        });
    }
    else {
        res.redirect('/login');
    }
}
//search by name
exports.hodparamsname = function (req, res) {
    var id = req.params.id;
    id = id.slice(1, id.length);
    if (login == id) {
        var sem = req.body.name;
        var event = Event.find({}).then(function (events) {
            var items = Faculity.find({}).then(function (FoundItems) {
                var it = Student.find({ name:  { $regex: '.*' + sem + '.*' }  }).then(function (i) {
                    var msg = Msg.find({}).sort({ _id: -1 }).limit(10).then(function (msg) {
                        var mentor = Faculity.find({ position: false }).then(function (m) {
                            res.render(__dirname + '/view/hodview/crud.html', { msgs: msg, name: FoundItems, name2: null, events: events, mentor: m, id: id,an:i })

                        })
                    })

                })
            })
        });
    }
    else {
        res.redirect('/login');
    }
}
//post request of hod view with id in params
exports.hodparamspost = function (req, res) {
    var id = req.params.id;
    id = id.slice(1, id.length);
    if (login == id) {
        var sem = req.body.semester;

        var na = req.body.name;
        var event = Event.find({}).then(function (events) {
            var items = Faculity.find({}).then(function (FoundItems) {
                var it = Student.find({ semester: sem }).then(function (i) {
                    var msg = Msg.find({}).sort({ _id: -1 }).limit(10).then(function (msg) {
                        var mentor = Faculity.find({ position: false }).then(function (m) {
                            res.render(__dirname + '/view/hodview/crud.html', { msgs: msg, name: FoundItems, name2: i, events: events, mentor: m, id: id ,an:null})

                        })
                    })


                })
            })
        })
    }
    else {
        res.redirect('/login');
    }
}

//get reuest of mentor view with id 
exports.mentorgetid = function (req, res) {
    var id = req.params.id;
    id = id.slice(1, id.length);
    console.log(id);
    if (login == id) {


        // console.log(m);
        var event = Event.find({}).then(function (events) {
            var items = Student.find({}).then(function (FoundItems) {
                var mentor = Faculity.find({ position: false }).then(function (i) {
                    var msg = Msg.find({}).sort({ _id: -1 }).limit(10).then(function (msg) {
                        var p = Faculity.findById(new objectId(id)).then(function (p) {

                            res.render(__dirname + '/view/mentorview/crud.html', { msgs: msg, name2: null, mentor: i, events: events, m: p ,an: null})

                        })

                    })
                })
            })
        })
    }
    else {
        res.redirect('/login');
    }
}

exports.mentorpostid =  function(req, res) {
    var id = req.params.id;
    id = id.slice(1, id.length);
    var m = Faculity.findOne({ id: id });
    var sem = req.body.semester;
    login = id;
    var event = Event.find({}).then(function (events) {
        var items = Student.find({ semester: sem }).then(function (FoundItems) {
            var mentor = Faculity.find({ position: false }).then(function (i) {
                var msg = Msg.find({}).sort({ _id: -1 }).limit(10).then(function (msg) {
                    var p = Faculity.findById(new objectId(id)).then(function (p) {

                        res.render(__dirname + '/view/mentorview/crud.html', { msgs: msg, name2: FoundItems, mentor: i, events: events, m: p ,an:null})

                    })
                })
            })
        })
    })
}

//adding an event
exports.addevent =  function(req, res){
    var id = req.params.id;
    id = id.slice(1, id.length);
    login = id;
    const events = new Event({
        title: req.body.title,
        discription: req.body.discription,
        start: req.body.start,
        end: req.body.end,
        date: Date()
    });
    events.save();
    res.redirect(`/faculityview/:${id}`)
}

//new semster
exports.extendreduce =  function(req, res) {
    var id = req.params.id;
    id = id.slice(1, id.length);
    login = id;
    Student.updateMany(
        {},
        { $inc: { semester: 1 } }
    ).then(() => {
        Student.deleteMany({ semester: { $gt: 8 } }).then(function (items) {
            res.redirect(`/faculityview/:${id}`)
        })

    })
}

//add messeges
exports.addmsg = function(req, res) {
    var id = req.params.id;
    id = id.slice(1, id.length);
    login = id;
    const msg = new Msg({
        msg: req.body.msgs,
        date: new Date()
    });
    msg.save().then(()=> res.redirect(`/faculityview/:${id}`))
   
}
exports.addfacget = (req, res) => {
    res.render(__dirname + '/public/views/addfaculity.html')

}

//delet a student
exports.dltstudent =  function(req, res) {
    var Id = req.body.id;
    var id = req.params.id;

    id = id.slice(1, id.length);
    login = id;
    Student.findByIdAndDelete(new objectId(Id)).then(() => {
        res.redirect(`/faculityview/:${id}`)
            ;
    })
    // Event.findByIdAndDelete({name});
}
//delete event
exports.dltevent =  function(req, res) {
    var Id = req.body.id;
    var id = req.params.id;
    id = id.slice(1, id.length);
    login = id;
    Event.findByIdAndDelete(new objectId(Id)).then(() => {
        res.redirect(`/faculityview/:${id}`)
            ;
    })
    // Event.findByIdAndDelete({name});
}
//delete msg
exports.dltmsg= function(req, res){
    var Id=req.body.id;
    var id=req.params.id;
    id=id.slice(1,id.length);
    login = id;
     Msg.findByIdAndDelete(new objectId(Id)).then(()=>{
      res.redirect(`/faculityview/:${id}`)
  ;  })
    // Event.findByIdAndDelete({name});
  }
//render view to update faculity
exports.upfac= function(req, res){
    var Id=req.params.Id;
    Id=Id.slice(1, Id.length);
    var id=req.params.id;
    id=id.slice(1, id.length);
   // console.log(id);
   login = id;
    res.render(__dirname+'/public/views/update.html',{Id:Id,id:id})
  
  }
async function getItems(){
        
    const Items = await Faculity.find({});
    return Items;
  
  }
//post reuest update faculity
exports.upfacpost=  function(req, res) {
    var Id=req.params.Id;
    Id=Id.slice(1, Id.length);
    var id=req.params.id;
    id=id.slice(1, id.length);
    console.log(id);
    console.log(Id);
    var ph=req.body.phone;
    login = id;
    Faculity.findByIdAndUpdate(new objectId(Id),{phone:ph}).then(()=>{
      res.redirect(`/faculityview/:${id}`)
      
    }).catch((err)=>{
      console.log("kuch err hai ");
      console.log(err);
    });
  }
//edit student
exports.stuedit= function(req, res) {

    var id=req.params.id;
    id=id.slice(1, id.length);
    var Id=req.body.urn;
   console.log(id);
   console.log(login);
   login = id;
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
  }
exports.taskpost= function(req, res) {
    var id = req.params.id;
    var task1 = req.body.task
    id = id.slice(1, id.length);
    const student =  Student.findById(id);
    //   student.updateOne(
    //     { _id: id },
    //     { $push: { task: task1} }
    //  ).then(function(err){
    //   console.log(err);
    //  })
    Student.findByIdAndUpdate({_id: id},
      {
        $push: {
          tasks: {
            "task":task1,
          } //inserted data is the object to be inserted 
        }
      }).then(function(item){
        Event.find({}).then(function (FoundItems) {
          //console.log(item);
          res.redirect(`/menteeView/:${id}`);
              })
      })
    // student.tasks = new task1({
    //   task: task1,
    // }).save();
  
  }
//add student
// exports.stuadd= function(req, res) {
//     var id=req.params.id;
//     id=id.slice(1, id.length);
//     login = id;
//     console.log("adding");
//     const obj = new Student({
//         urn:req.body.urn,
//     name: req.body.name,
//      phone:req.body.phone,
//      semester:req.body.semester,
//        comment:req.body.comment,
//        mentor:req.body.mentor,
       
//     }
//     );
//     obj.save().then(()=> res.redirect(`/faculityview/:${id}`))

//   }
// exports.addfac=async (req, res, next)=> {
//     var id=req.params.id;
//     id=id.slice(1, id.length);
//   //  let salt= await bcrypt.genSalt(10);
//   //  let hashp= await bcrypt.hash(req.body.password,salt);
//   login=id;
//     var obj={
//       img: {
//         data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//         contentType: 'image/png'
//     },
//       name: req.body.name,
//     //  password:hashp,
//       password:req.body.password,
//       position:req.body.position,
//       phone:req.body.phone
//     };
//     Faculity.create(obj)
//     .then ((err, item) => {
//       res.redirect(`/faculityview/:${id}`)
       
//     });
//   }
// //

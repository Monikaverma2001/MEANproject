var mongoose = require('mongoose');
var db = require ( '../config/db' );
const Student = require('../models/student');
console . log ( "connecting--" , db );
const path = require('path');
var fs = require('fs');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });
exports.insertstudent=function(req, res, next) {
 
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
                if (err) {
                  console.log("kuch error hai");
                    console.log(err);
                }
                else {
                    // item.save();
                    
                    res.redirect('/mentorview');
                }
            });
          
    
}
;

exports.deletestudent=async(req,res)=>
{
    var name=req.body.name;
  
    Student.deleteOne({name}).then(()=>{
      res.redirect('/mentorview');
      
    }).catch((err)=>{
      console.log("kuch err hai ");
      console.log(err);
    })
}
;
exports.searchStudent=function(req,res){
    var name=req.body.name;
    
    Student.find({name}).then(function(FoundItems){
        res.json(FoundItems);
    
    }).catch((err)=>{
        console.log("kuch err hai ");
        console.log(err);
    });
}
exports.searchStudentSem=function(req,res){
    var semester=req.body.semester;
    console.log(semester);
    Student.find({"semester":semester}).then(function(FoundItems){
        res.json(FoundItems);
        
    
    }).catch((err)=>{
        console.log("kuch err hai ");
        console.log(err);
    });
}
exports.searchAll=function(req,res){
    Student.find({}).then(function(FoundItems){
        res.json(FoundItems);
    
    }).catch((err)=>{
        console.log("kuch err hai ");
        console.log(err);
      });
}

var mongoose = require('mongoose');

var db = require ( '../config/db' );
const Faculity = require('../models/faculity');

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

exports.insertfaculity=function(req, res) {
    
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
                if (err) {
                  console.log("kuch error hai");
                    console.log(err);
                }
                else {
                    // item.save();
                    
                    res.redirect('/faculityview');
                }
            });
        res.redirect('/faculityview');
}


exports.deletefaculity=function(req,res)
{
    var name=req.body.name;
    var position=req.body.position;
    Faculity.deleteOne({name,position}).then(()=>{
      res.redirect('/faculityview');
      
    })
}
 
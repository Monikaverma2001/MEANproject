var mongoose = require('mongoose');

var db = require ( '../config/db' );
const Faculity = require('../models/faculity');



exports.insertfaculity=function(req, res) {
    
        const faculity= new Faculity({
          name: req.body.name,
           password:req.body.password,
          position:req.body.position
        });
        faculity.save();
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
 
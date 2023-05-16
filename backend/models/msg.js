var mongoose=require('mongoose');
module.exports = mongoose.model('Msg', {
  
   msg:{type : String, default: ''},
  date:{type:String,default :''},
   

    });
    
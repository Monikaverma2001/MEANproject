var mongoose = require('mongoose');
// define our students model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Student', {
   
urn: {type : Number, default: 00000000},
name : {type : String, default: ''},
phone:{type:Number,default:0000000000},
semester:{type:Number,default:0},
batch :{
    year : {type : String , default :''},
    class:{type : String , default :''},
    section:{type : String , default :''},
    session:{type : String , default :''}
}
,
mentor:{type:String,default:''},
comment:{type: String,default:''},
tasks : {
    task:{type : String, default:''}
},
});
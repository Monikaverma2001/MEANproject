var mongoose = require('mongoose');
// define our students model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Student', {
name : {type : String, default: ''},
phone:{type:Number,default:0000000000},
semester:{type:Number,default:0},
comment:{type:String,default:''},
mentor:{type:String,default:''}
});

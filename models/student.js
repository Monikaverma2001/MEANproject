var mongoose = require('mongoose');
// define our students model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Student', {
    img:
    {
        data: Buffer,
        contentType: String
    },
urn: {type : Number, default: 00000000},
name : {type : String, default: ''},
phone:{type:Number,default:0000000000},
semester:{type:Number,default:0},
mentor:{type:String,default:''},
comment:{"type": String,default:''}
});

var mongoose = require('mongoose');
// define our students model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Faculity', {
    img:
    {
        data: Buffer,
        contentType: String
    },
name : {type : String, default: ''},
password :{type : String, default: ''},
position :{type : String, default: 'false'},
phone:{type : String, default: 'false'}
});

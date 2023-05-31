const express = require('express'); //import express
const router  = express.Router(); 
const controller=require('./controller');

router.get('/',controller.home);
router.post('/faculityview/:id/delete:Id',controller.hodparamsds);
router.get('/faculityview/:id',controller.hodparams);

router.post('/faculityview/:id',controller.hodparamspost);
router.get('/mentorview/:id',controller.mentorgetid);
router.post('/mentorview/:id',controller.mentorpostid);
router.get('/login', controller.logging);
router.post('/loginp', controller.postlogin);

router.post('/addevent/:id',controller.addevent)

router.get('/extend/:id',controller.extendreduce)
router.post('/addmsg/:id',controller.addmsg)
router.get('/addfaculity',controller.addfacget)
router.post('/studelete/:id',controller.dltstudent)
router.post('/eventdelete/:id',controller.dltevent)
router.post('/msgdelete/:id',controller.dltmsg)
router.get("/faculityview/:id/update/:Id", controller.upfac);
router.post("/faculityview/:id/edit/:Id",controller.upfacpost);
router.post("/stuedit/:id",controller.stuedit);


module.exports=router;
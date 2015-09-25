var express = require('express');
var router = express.Router();

var cpush   = require('../lib/cpush.js');

/*======================================================*/


router.get('/findAll',function (req, res) {
  // body...
  cpush.findAll(function (error,cpushs) {
    // body...
    res.json(cpushs)
  })
})

router.get('/findById',function (req, res) {
  // body...
  var _id_find = req.query._id

  if (!_id_find) {
    return res.json({result : false,
                     message : "fail,lost some params"})
  }

  cpush.findById(_id_find,function (error,cpushs) {
    // body...
    res.json(cpushs)
  })
})

router.get('/findByMacAddr',function (req, res) {
  // body...
  var macAddr_find = req.query.macAddr

  if (!macAddr_find) {
    return res.json({result : false,
                     message : "fail,lost some params"})
  }

  cpush.findByMacAddr(macAddr_find,function (error,cpushs) {
    // body...
    res.json(cpushs)
  })
})

router.get('/centerFindByMacAddr',function (req, res) {
  // body...
  var macAddr_find = req.query.macAddr

  if (!macAddr_find) {
    return res.json({result : false,
                     message : "fail,lost some params"})
  }

  cpush.Center_FindByMacAddr(macAddr_find,function (error,cpushs) {
    // body...
    res.json(cpushs)
  })
})


router.post('/create',function (req, res) {
  // body...
  var center_macAddr_create   = req.body.center_macAddr
  var inedot_macAddr_create   = req.body.inedot_macAddr
  var command_create          = req.body.command


  if (!center_macAddr_create || !inedot_macAddr_create || !command_create) {
        return res.json({result : false,
                         message : "fail,lost some params"})
  }

  //2. Create Center
  cpush.create(center_macAddr_create, inedot_macAddr_create, command_create,
        function (error, result) {
          // body...
          if (error) {
            return res.send(error)
          }
          if (result.result == false) {
            return res.json(result)
          }
          res.json(result)
      })

})

//Update Data Next Step
//Update CheckMark
router.post('/updateCheckMark',function (req, res) {
  // body...

  var _id_update      = req.body._id

  if (!_id_update) {
    return res.json({result : false,
                     message : "fail,lost some params(_id)"})
  }

  cpush.updateCheckMark(_id_update,
                 function (error, result) {
                   // body...
                   if (error) {
                     return res.send(error)
                   }
                   if (result.result == false) {
                     return res.json(result)
                   }
                   res.json(result)
                 })

})


router.post('/delete',function (req, res) {
  // body...
  var _id_delete    = req.body._id

  if (!_id_delete) {
    return res.json({result : false,
                     message : "fail,lost some params"})
  }

  //2. Delete Center
  center.deleteById(center_id_delete, function (error, result) {
    // body...
    if (error) {
      return res.send(error)
    }
    if (result.result == false) {
      return res.json(result)
    }
    res.json(result)
  })

})




module.exports = router;

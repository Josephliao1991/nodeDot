var mongoose   = require('mongoose');
var express    = require('express');
var router     = express.Router()

var Person = require('./Person.js');
var Story  = require('./Story.js');

var Story = mongoose.model('story')

router.get('/getAllPerson', function (req, res) {
  // body...
  Person.findAll(function (error, people) {
    // body...
    if (error) {
      return error
    }

    res.json(people)
  })
})

router.get('/getAllStory', function (req, res) {
  // body...
  Story.findAll(function (error, stories) {
    // body...
    if (error) {
      return error
    }

    res.json(stories)
  })
})

router.get('/createPerson',function (req, res) {
  // body...
  var name_create = req.query.name

  if (name_create==null) {
    return res.send({reqult  : false,
                     message : "Fail, Lost Some ParamS"})
  }

  Person.create(name_create, function (error, result) {
    // body...
    if (error) {
      return res.send(error)
    }
    res.json(result)
  })
})

router.get('/addStory',function (req, res) {
  // body...
  var person_id_create   = req.query.person_id
  var title_create  = req.query.title

  if (name_create==null || title_create==null) {
    return res.send({reqult  : false,
                     message : "Fail, Lost Some ParamS"})
  }

  Story.create(title_create, person_id_create, function (error, result) {
    // body...
    if (error) {
      return res.send(error)
    }

    if (result.result==false) {
      return res.json(result)
    }

    var story_id = result.data._id

    Person.addStory(person_id_create, story_id, function (error, result) {
      // body...
      if (error) {
        return res.send(error)
      }
      return res.json(result)
    })
  })



})

router.get('/deleteStory', function (req, res) {
  // body...
  var person_id_delete = req.query.person_id
  var sroty_id_delete  = req.query.story_id

  Person.deleteStory(person_id_delete, sroty_id_delete, function (error, result) {
    // body...
    if (error) {
      return res.send(error)
    }
    console.log("Story Is Delete From Person");
    res.json(result)
  })

  Story.deleteById(story_id_delete, function (error, result) {
    // body...
    console.log("Story Is Delete");

  })


})



module.exports = router

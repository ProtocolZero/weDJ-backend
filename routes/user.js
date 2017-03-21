const express = require('express')
const router = express.Router()
var knex = require('../db/knex')

function User(){
    return knex('app_user')
}
// CREATE 
    router.post('/', function (req, res){
        User().insert({
            email: req.body.email, 
            username: req.body.username
        })
        .then(function(){
            res.sendStatus(201)
        })
    }) 
// READ 
    router.get('/', function (req, res){
     User().select().then(function (result){
           res.send(result)
       })
    })

    router.get('/:email', function (req, res){
        User().where('email',
        req.params.email).first().then(function
        (result){
            res.send(result)
        })
    })
// UPDATE 
router.put('/:email', function (req, res){
    User().where('email', req.params.email)
    .update({
        username: req.body.username
    },'email').then(function(result){
        res.send('user'+ result + 'was updated')
        
    }).catch(err => {
        console.log(err)
    })
})

// DELETE 
router.delete('/:email', function (req, res){
    User().where('email', req.params.email).del()
    .then(function (result){
        res.send(201); 
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router 

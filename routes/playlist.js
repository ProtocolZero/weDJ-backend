const express = require('express')
const router = express.Router()
var knex = require('../db/knex')

function play(){
    return knex('playlist')
}
// CREATE
    router.post('/', function (req, res){
        play()
				.insert({
            name: req.body.name
        }, 'id')
        .then(function(result){
					console.log(result)
            res.json(result)
        })
    })
// READ
    router.get('/', function (req, res){
       play().select().then(function (result){
           res.send(result)
       })
    })

    router.get('/:id', function (req, res){
        play().where('id',
        req.params.id).first().then(function
        (result){
            res.send(result)
        })
    })
// UPDATE
router.put('/:id', function (req, res){
    play().where('id', req.params.id)
    .update({
        name: req.body.name
    },'id').then(function(result){
        res.send('playlist'+ result + 'was updated')
    }).catch(err => {
        console.log(err)
    })
})

// DELETE
router.delete('/:id', function (req, res){
    play().where('id', req.params.id).del()
    .then(function (result){
        res.send(201);
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router

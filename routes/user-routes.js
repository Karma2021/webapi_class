const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/User')

router.post('/register', (req, res, next) => {
    const { username, password, fullname, email } = req.body
    User.findOne({ username: username })
        .then((user) => {
            if (user) return res.status(400).json({ error: 'duplicate username' })
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) return res.status(500).json({ error: err.message })
                User.create({ username, password: hash, fullname, email })
                    .then((user) => {
                        res.status(202).json(user)
                    }).catch(next)
            })
        }).catch(next)
})
router.get('/register', (req, res, next)=>{
    res.send(req.body)
})

router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) return res.status(400).json({ error: "user is not found" })
            bcrypt.compare(req.body.password, user.password, (err, success) => {
                if (err) return res.status(500).json({ error: err.message })
                if (!success) return res.status(400).json({ error: "password wrong" })
                const payload = {
                    id: user.id,
                    username: user.username
                }
                jwt.sign(payload, 
                    process.env.SECRET, 
                    {expiresIn: '1d'},
                    (err, token)=>{
                        if(err) return res.status(500).json({error: err.message})
                        res.json({status: 'success', token: token})
                    })
            })
        }).catch(next)
})
module.exports = router
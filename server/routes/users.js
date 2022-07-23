const express = require("express");
const router = express.Router();
const {  User } = require('../models');



router.get('/', async (req,res) => {
    try {
        const users = await User.findAll();
        return res.json(users);
    } catch(err) {
        console.log(err);
        return res.status(500).json(err)
    }
})



router.get('/:id', async (req, res) => {
    const id  = req.params.id
    try {
        const users = await User.findOne({
            where: {
            id
        }})
        return res.json(users);
    } catch(err) {
        console.log(err);
        return res.status(500).json(err)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params;
})

router.post('/signup', async (req, res) => {
    
    const { name, email, password } = req.body
    console.log(password)
    try {
        const user = await User.create({ name, email, password })
         return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
})

router.post("/signin", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
            name,email,password
            }
        })
         return res.json(user)
    } catch (err) {
        console.log(err)
        return  res.status(500).json(err)
    }
   
    
})

module.exports = router;
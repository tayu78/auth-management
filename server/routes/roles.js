const express = require("express");
const router = express.Router();
const {  Role } = require('../models');



router.post('/', async (req, res) => {
    const { name, email, role } = req.body
    try {
        const user = await User.create({ name, email, role })
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
})

router.get('/', async (req,res) => {
    try {
        const roles = await Role.findAll();
        return res.json(roles);
    } catch(err) {
        console.log(err);
        return res.status(500).json(err)
    }
})



// router.get('/:id', async (req, res) => {
//     const id  = req.params.id
//     try {
//         const users = await User.findOne({
//             where: {
//             id
//         }})
//         return res.json(users);
//     } catch(err) {
//         console.log(err);
//         return res.status(500).json(err)
//     }
// })

// router.put('/:id', async (req, res) => {
//     const id = req.params;
// })





module.exports = router;
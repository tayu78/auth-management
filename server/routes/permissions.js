const express = require("express");
const router = express.Router();
const {  Permission } = require('../models');



router.post('/', async (req, res) => {
    const { name} = req.body
    try {
        const permission = await Permission.create({ name })
        return res.json(permission)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
})

router.get('/', async (req,res) => {
    try {
        const permissions = await Permission.findAll();
        return res.json(permissions);
    } catch(err) {
        console.log(err);
        return res.status(500).json(err)
    }
})

router.delete('/:name', async (req,res) => {
    const { name } = req.params;
    try {
        await Permission.destroy({
            where: {
              name
            }
        }); 
        return res.send(`permission ${name} is deleted successfully!! `)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
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
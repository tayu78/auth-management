const express = require("express");
const router = express.Router();
const {  User,Role } = require('../models');



router.get('/', async (req,res) => {
    try {
        const users = await User.findAll({
            include: "role"
        });
        return res.json(users);
    } catch(err) {
        console.log(err);
        return res.status(500).json(err)
    }
})

//return user's role name
router.get('/role/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({
            where: {
                email
            }
        })
        const userRole = await user.getRole();
        const userRoleName = userRole?.dataValues?.name
        
        return res.json(userRoleName);
    } catch(err) {
        console.log(err);
        return res.status(500).json(err)
    }
})


router.post("/", async (req, res) => {
    const { name, email, password, userRole } = req.body;
    try {
        const user = await User.create({ name, email, password});
        const role = await Role.findOne({
            where: {
                name: userRole
            }
        })
       await user.setRole(role);
        
        return res.send(`user ${name} created successfully!!!!`)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
})




router.post('/signup', async (req, res) => {
    
    const { name, email, password } = req.body
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


router.delete("/:email", async (req,res) => {
    const { email } = req.params;
    try {
         await User.destroy({
             where: { email }
         })
        
        res.send(`user ${email} is deleted successfully!!`)
    } catch (err) {
        console.log(err)
        return  res.status(500).json(err)
    }
})


module.exports = router;
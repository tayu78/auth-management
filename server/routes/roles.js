const express = require("express");
const router = express.Router();
const {  Role,Permission } = require('../models');



router.post('/', async (req, res) => {
    const { name, selectedPermissions } = req.body;
    const ids = selectedPermissions.map(permission => permission.id );
    
    try {
        const role = await Role.create({ name });
        const permissions = await Permission.findAll(
            {
                where: {
                        id: ids
            }}
        );
       await role.addPermission(permissions);
        return res.json(role);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})



router.get('/', async (req,res) => {
    try {
        const roles = await Role.findAll({
            include: Permission
        });
        return res.json(roles);
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.get('/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const role = await Role.findOne({
            where: { name },
        })
        const rolesPermissions = await role.getPermissions()
        const rolesPermissionsNames = rolesPermissions.map(d => d.dataValues.name)
        
        return res.json(rolesPermissionsNames);
        

    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
})

module.exports = router;
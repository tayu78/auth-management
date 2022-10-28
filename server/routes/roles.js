const express = require("express");
const router = express.Router();
const { Role, Permission } = require("../models");

router.post("/", async (req, res) => {
  const { name, selectedPermissions } = req.body;
  const ids = selectedPermissions.map((permission) => permission.id);
  try {
    const isExistingRole = await Role.findOne({ where: { name } });
    if (isExistingRole) {
      return res.status(400).json({
        message: "Role with provided name already exists.",
      });
    }
    const role = await Role.create({ name });
    const permissions = await Permission.findAll({
      where: {
        id: ids,
      },
    });
    if (!permissions.length) {
      return res
        .status(404)
        .json({ message: "Permissions with provided ids does not exist. " });
    }

    await role.addPermission(permissions);
    return res.status(200).json(role);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: Permission,
    });
    return res.status(200).json(roles);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//TODO change endpoint name to easy to understand (to get roles's permission)
router.get("/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const role = await Role.findOne({
      where: { name },
    });
    const rolesPermissions = await role.getPermissions();
    const rolesPermissionsNames = rolesPermissions.map(
      (d) => d.dataValues.name
    );

    return res.status(200).json(rolesPermissionsNames);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, selectedPermissions } = req.body;
  try {
    const ids = selectedPermissions.map((permission) => permission.id);

    const isExistingRole = await Role.findOne({ where: { name } });
    if (isExistingRole) {
      return res.status(400).json({
        message: "Role with provided name already exists.",
      });
    }

    await Role.update({ name }, { where: { id } });

    const role = await Role.findOne({ where: { id } });
    const permissions = await Permission.findAll({ where: { id: ids } });

    await role.setPermissions(permissions);

    res.status(200).send("role updated successfully!!!!");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.delete("/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const role = await Role.findOne({ where: { name } });
    if (!role) {
      return res
        .status(404)
        .json({ message: "Role with provided name does not exist." });
    }
    await Role.destroy({
      where: {
        name,
      },
    });
    res.send(`role ${name} is deleted successfully!!!`);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;

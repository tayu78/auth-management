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
      return res.status(400).json({ message: "Please select permissons." });
    }

    await role.addPermission(permissions);
    return res.status(201).json({
      message: "New role is successfuly created.",
      role,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
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
    return res.status(500).json({ message: "Something went wrong" });
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
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, selectedPermissions } = req.body;
  try {
    const ids = selectedPermissions.map((permission) => permission.id);

    if (name) {
      const isExistingRole = await Role.findOne({ where: { name } });
      if (isExistingRole) {
        return res.status(400).json({
          message: "Role with provided name already exists.",
        });
      }
      await Role.update({ name }, { where: { id } });
    }

    const role = await Role.findOne({ where: { id } });
    const permissions = await Permission.findAll({ where: { id: ids } });

    await role.setPermissions(permissions);

    res.status(200).json({ message: "Role updated successfully!!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
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
    res.json({ message: `Role ${name} is deleted successfully!!` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;

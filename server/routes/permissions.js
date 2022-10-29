const express = require("express");
const router = express.Router();
const { Permission } = require("../models");

router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const isExistingPermission = await Permission.findOne({ where: { name } });
    if (isExistingPermission) {
      return res
        .status(400)
        .json({ message: "Permission with provided name already exists." });
    }
    const permission = await Permission.create({ name });

    return res.status(201).json({
      message: "New permission is successfully created",
      permission,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/", async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    return res.json(permissions);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const isExistingPermission = await Permission.findOne({ where: { name } });
    if (isExistingPermission) {
      return res
        .status(400)
        .json({ message: "Permission with provided name already exists." });
    }
    await Permission.update(
      { name },
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).json({
      message: "Permission updated successfully !!!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.delete("/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const permission = await Permission.findOne({ where: { name } });
    if (!permission) {
      return res
        .status(404)
        .json({ message: "Permission with provided name does not exist." });
    }
    await Permission.destroy({
      where: {
        name,
      },
    });
    return res.json({
      message: `Permission ${name} is deleted successfully!! `,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;

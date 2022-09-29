const express = require("express");
const router = express.Router();
const { Permission } = require("../models");

router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const permission = await Permission.create({ name });
    return res.json(permission);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    return res.json(permissions);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await Permission.update(
      { name },
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).send("user updated successfully !!!");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.delete("/:name", async (req, res) => {
  const { name } = req.params;
  try {
    await Permission.destroy({
      where: {
        name,
      },
    });
    return res.send(`permission ${name} is deleted successfully!! `);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;

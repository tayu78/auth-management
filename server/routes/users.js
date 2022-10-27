const express = require("express");
const router = express.Router();
const { User, Role } = require("../models");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: "role",
    });
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong." });
  }
});

//return user's role name
router.get("/role/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "no such user.",
      });
    }
    const userRole = await user.getRole();
    const userRoleName = userRole?.dataValues?.name;

    return res.json(userRoleName);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong." });
  }
});

router.post("/", async (req, res) => {
  const { name, email, password, userRole } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const role = await Role.findOne({
      where: {
        name: userRole,
      },
    });
    await user.setRole(role);

    return res.status(201).send(`user ${name} created successfully!!!!`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong." });
  }
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill the all input" });
    }
    const isExistingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (isExistingUser) {
      return res
        .status(400)
        .json({ message: "User with requested email is already exist." });
    }

    const user = await User.create({ name, email, password });

    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong." });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill the all input" });
    }
    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "No such user.",
      });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong." });
  }
});

// TODO recieve not email  but id
router.delete("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "No such user.",
      });
    }
    await User.destroy({
      where: { email },
    });

    res.status(200).send(`user ${email} is deleted successfully!!`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong." });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, userRole } = req.body;
  try {
    const role = await Role.findOne({
      where: {
        name: userRole,
      },
    });

    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "No such user.",
      });
    }

    await User.update(
      { name, email, roleId: role.id },
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).send(`user updated successfully!!!`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = router;

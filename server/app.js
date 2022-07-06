const express = require('express');

const { sequelize,User } = require('./models');
const user = require('./models/user');

const app = express();
app.use(express.json());

app.post('/users', async (req,res) => {
    const { name, email, role } = req.body
    try {
        const user = await User.create({ name, email, role })
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

app.get('/users', async (req,res) => {
    try {
        const users = await User.findAll()
        return res.json(users);
    } catch(err) {
        console.log(err);
        return res.status(500).json(err)
    }
})

app.get('/users/:uuid', async (req, res) => {
    const uuid  = req.params.uuid
    try {
        const users = await User.findOne({
            where: {
            uuid
        }})
        return res.json(users);
    } catch(err) {
        console.log(err);
        return res.status(500).json(err)
    }
})


app.listen({ port: 5000 }, async () => {
    console.log("Server up on http://localhost:5000")
    await sequelize.sync({ force: false });
    // await sequelize.authenticate();
    console.log("Database connected!")
})


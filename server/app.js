const express = require('express');
const cors = require('cors');
const { sequelize, User } = require('./models');
const userRoute = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoute);


app.listen({ port: 5000 }, async () => {
    console.log("Server up on http://localhost:5000")
    await sequelize.sync({ force: false });
    // await sequelize.authenticate();
    console.log("Database connected!")
})


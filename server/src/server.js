const express = require('express');
const routes = require('./routes.js');
const yup = require("yup");
const cors = require('cors');

require('./database');

const app = express();

app.use(cors({
    origin: 'http://localhost:8080'
}));
app.use(express.json());
app.use(routes);

const linkSchema = yup.object({
    body: yup.object({
        name: yup.string().min(3).required(),
        senha: yup.string().min(15).required(),
        email: yup.string().email().required(),
    }),
});

const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (err) {
        return res.status(400).json({ type: err.name, message: err.message });
    }
};

app.post("/user/create", validate(linkSchema), (req, res) => {
    return res.json({ body: req.body, id: req.params.id });
});

const start = (port) => {
    try {
        app.listen(port, () => {
            console.log(`app running at: http://localhost:${port}`);
        });
    } catch (err) {
        console.error(err);
        process.exit();
    }
};

start(3000);

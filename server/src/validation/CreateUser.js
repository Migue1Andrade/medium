const yup = require("yup");

const linkSchema = yup.object({
	body: yup.object({
		name: yup.string().min(3).required(),
		senha: yup.string().min(15).required(),
		email: yup.string().email().required(),
	}),
});

module.exports = linkSchema;

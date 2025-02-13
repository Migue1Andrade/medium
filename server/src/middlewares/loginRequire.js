const jwt = require('jsonwebtoken');
const cors = require('cors');

module.exports = (req, res, next) => {
	const { authorization } = req.headers;

	if(!authorization) throw new Error('Token não informado');

	const token = authorization.split(' ')[1];

	try {
		const dados = jwt.verify(token, process.env.TOKEN_SECRET);
		const { id, email } = dados;

		req.userId = id;
		req.email = email;

		return next();
	} catch(error) {
		console.log("🚀 ~ error:", error);

		throw new Error('token inspirado ou invalido');
	};
};

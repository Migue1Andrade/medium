const jwt = require('jsonwebtoken');
const cors = require('cors');

module.exports = (req, res, next) => {
	const { authorization } = req.headers;

	if(!authorization) return res.status(401).json('Voce precisa fazer um login');

	const token = authorization.split(' ')[1];

	try {
		const dados = jwt.verify(token, process.env.TOKEN_SECRET);
		const { id, email } = dados;

		req.userId = id;
		req.email = email;

		return next();
	} catch(error) {
		console.log("🚀 ~ e:", error);
		return res.status(401).json('token inspirado ou invalido');
	};
};

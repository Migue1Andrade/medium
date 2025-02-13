const jwt = require('jsonwebtoken');
const idFromUser = require('../models/Post.js');

module.exports = (req, res, next) => {
	const { authorization } = req.headers;

	if(!authorization) throw new Error('Voce precisa fazer login');

	const token = authorization.split(' ')[1];

	try {
		const dados = jwt.verify(token, process.env.TOKEN_SECRET); 

		if( id != idFromUser.user_id) return;

		const { id, email } = dados;

		req.userId = id; 
		req.email = email;

		return next();
	} catch(error) {
		console.log("🚀 ~ error:", error);
		throw new Error('token inspirado ou invalido');
	};
};

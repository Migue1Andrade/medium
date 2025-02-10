const jwt = require('jsonwebtoken');
const idFromUser = require('../models/Post.js');

module.exports = (req, res, next) => {
	const { authorization } = req.headers;

	if(!authorization) {
		return res.status(401).json('Voce precisa fazer um login');  
	}
	const token = authorization.split(' ')[1];

	try {
		const dados = jwt.verify(token, process.env.TOKEN_SECRET); 

		console.log("🚀 ~ dados:", dados);
		
		if( id != idFromUser.user_id) return;

		const { id, email } = dados;

		req.userId = id; 
		req.email = email;

		return next();
	} catch(e) {
		console.log("🚀 ~ e:", e);
		return res.status(401).json('token inspirado ou invalido');  
	}
}
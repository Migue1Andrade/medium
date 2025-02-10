require('dotenv').config();
const AuthService = require('../service/auth.js');

module.exports = {
	async store(req, res) {
		try {
			const { email, password } = req.body;
			const response = await AuthService.authenticateUser(email, password);

			return res.json(response);
		} catch (error) {
			console.error("🚀 ~ store ~ error:", error);

			return res.status(401).json({ errors: [error.message] });
		}
	}
};

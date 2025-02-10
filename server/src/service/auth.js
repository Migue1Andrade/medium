require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthService {
	async authenticateUser(email, password) {
		if (!email || !password) {
			throw new Error('Credenciais inválidas');
		}

		const user = await User.findOne({ where: { email } });

		if (!user || !(await user.passwordIsValid(password))) {
			throw new Error('Usuário ou senha incorretos');
		}

		const { id } = user;

		const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
			expiresIn: process.env.TOKEN_EXPIRATION,
		});

		return { token, id };
	}
}

module.exports = new AuthService();

const User = require('../models/User');
const bcrypt = require('bcrypt');
const { hashSync, genSaltSync } = require('bcrypt');
const saltRounds = 10;

class userService {
	async updateUser(req, res) {
		const { user_id } = req.params;
		const { name, email, currentPassword, newPassword } = req.body;

		const user = await User.findByPk(user_id);

		if (!user) throw new Error('Usuário não encontrado');

		if (email && email !== user.email) {
			const emailExists = await User.findOne({ where: { email } });

			if (emailExists) throw new Error('Email já cadastrado');
		};

		if (currentPassword) {
			const passwordMatch = await bcrypt.compare(currentPassword, user.password);

			if (!passwordMatch) throw new Error('Senha incorreta');
		};

		if (name) user.name = name;
		if (email) user.email = email;

		if (newPassword) {
			const hash = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(newPassword, hash);
		};

		await user.save();

		return res.status(200).json({ message: 'Dados atualizados com sucesso!' });
	};

	async getAllUsers() {
		const users = await User.findAll();

		return users;
	};

	async createUser(userData) {
		const { name, password, email } = userData;
		const hash = genSaltSync(saltRounds);
		const hashedPassword = hashSync(password, hash);

		const user = await User.create({
			name,
			password: hashedPassword,
			email,
			profile_img: 'https://placehold.co/600x400'
		});

		return user;
	};

	async getUserById(user_id) {
		const user = await User.findByPk(user_id);
		if (!user) throw new Error('Usuário não encontrado');

		return user;
	};
};

module.exports = new userService();

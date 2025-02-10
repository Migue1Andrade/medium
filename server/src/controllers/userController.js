const UserService = require('../service/user.js');

module.exports = {
	async createUser(req, res) {
		try {
			const response = await UserService.createUser(req.body);

			return res.status(201).json(response);
		} catch (error) {
			console.error("🚀 ~ createUser ~ error:", error);

			return res.status(500).json({ error: 'Erro ao criar usuário' });
		}
	},

	 async index(req, res) {
		try {
			const data = await UserService.getAllUsers();
	
			if (!data.length) return res.status(204).json([]);
			
			return res.json(data);
		} catch (error) {
			console.error("🚀 ~ index ~ error:", error);

			return res.status(500).json({ error: error.message });
		}
	},

	async getUserById(req, res) {
		try {
			const { user_id } = req.params;
			const user = await UserService.getUserById(user_id);

			return res.status(200).json(user);
		} catch (error) {
			console.error("🚀 ~ getUserById ~ error:", error);

			return res.status(403).json({ message: 'Erro ao buscar usuário' });
		}
	},

	async updateUser(req, res) {
		const { user_id } = req.params;

		try {
			const response = await UserService.updateUser(user_id, req.body);
			return res.status(200).json(response);
		} catch (error) {
			console.error("🚀 ~ updateUser ~ error:", error);
			return res.status(400).json({ error: error.message });
		}
	}
}

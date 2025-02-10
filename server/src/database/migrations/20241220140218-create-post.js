'use strict';

/** @type {import('sequelize-cli').Migration} */
	
module.exports = {
	async up (queryInterface, Sequelize) {

		const transaction = await queryInterface.sequelize.transaction();
	
		try {
			
		await queryInterface.createTable('post', { 
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users', 
					key: 'id' 
				},
				onUpdate: 'CASCADE', 
				onDelete: 'CASCADE'
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false
			},
			text: {
				type: Sequelize.TEXT, 
				allowNull: false
			},
			summary: {
				type: Sequelize.STRING,
				allowNull: false
			},
			likes: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			post_img: {
				type: Sequelize.STRING,
				allowNull: true
			},
			is_deleted: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			post_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('now')
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: true,
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			}
		}, { transaction });

		await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	},

  async down (queryInterface) {

	const transaction = queryInterface.sequelize.transaction();

	try {
		await queryInterface.dropTable('post');
	} catch (error) {
		console.log(error);
		await transaction.rollback();
	}
  }
};
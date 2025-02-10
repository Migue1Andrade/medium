'use strict';

/** @type {import('sequelize-cli').Migration} */
	
module.exports = {
	async up (queryInterface, Sequelize) {

		const transaction = await queryInterface.sequelize.transaction();
	
		try {
			
		await queryInterface.createTable('comments', {
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
			post_id: {
				type: Sequelize.INTEGER,
				allowNull: false
			  },
            comment: {
                type: Sequelize.STRING,
                allowNull: true
            },
			comment_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('now')
			},
			is_deleted: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false
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
		await queryInterface.dropTable('comments');
	} catch (error) {
        console.log(error);
		await transaction.rollback();
	}
  }
};
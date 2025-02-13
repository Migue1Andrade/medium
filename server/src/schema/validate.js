const validate = (schema) => async (req, res, next) => {
	try {
		await schema.validate({
			body: req.body,
			query: req.query,
			params: req.params
		}).unknown(false);

		return next();
	} catch (error) {
		throw new Error(error.errors);
	};
};

module.exports = validate;

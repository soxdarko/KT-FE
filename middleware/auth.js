const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const token = req.headers.cookie;

	if (token) {
		jwt.verify(token, process.env.SECRET, error => {
			if (error) {
				res.status(401).json({
					success: false,
					error: error.message,
				});
			} else {
				next();
			}
		});
	} else {
		res.status(401).json({
			success: false,
			error: 'Missing credentials',
		});
	}
	return console.log(token);
};

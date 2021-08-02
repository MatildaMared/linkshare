function getAccess(req, res) {
	const user = {
		id: req.user.id,
		firstName: req.user.firstName,
		email: req.user.email,
		username: req.user.username,
	};

	res.status(200).json({
		success: true,
		message: "You are authorized to access this route...",
		user,
	});
}

module.exports = { getAccess };

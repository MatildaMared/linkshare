function getAccess(req, res) {
	res.status(200).json({
		success: true,
		message: "You are authorized to access this route...",
	});
}

module.exports = { getAccess };

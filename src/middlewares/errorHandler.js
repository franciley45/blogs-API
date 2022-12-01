const errorHandler = (error, _req, res, _next) => {
    const { statusCode, message } = error;
    return res.status(statusCode).json({ message });
};
module.exports = errorHandler;
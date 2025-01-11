const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        error: {
            message: 'Route not found',
            statusCode: 404,
        },
    });
};

const Validator = (req, res, next) => {
    const { title, description, completed, dueDate } = req.body;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
        return res.status(400).json({ 
            success: false, 
            message: 'Title is required and must be a non-empty string.' 
        });
    }

    next();
};


module.exports = {notFoundHandler, Validator};

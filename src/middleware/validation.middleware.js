const { body, validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    next();
};

const registerUserValidationRules = [
    body("username")
        .isString()
        .isLength({ min: 3, max: 20 }),

    body("email")
        .isEmail(),

    body("password")
        .isLength({ min: 6 }),

    validateResult
];

const loginUserValidationRules = [
    body("email")
        .optional()
        .isEmail(),

    body("username")
        .optional()
        .isLength({ min: 6, max: 20 }),
    validateResult
]


module.exports = {
    registerUserValidationRules, loginUserValidationRules
};

const Joi = require('joi');
class Authentication {
    /**
     * @description defines the req.body schema for "auth/login" route
     * @return {Joi}
     */
    static loginSchema() {
        return Joi.object({
            email: Joi.string().email().lowercase().required(),
            password: Joi.string().min(8).required().strict(),
        });
    }
        /**
     * @description defines the req.body schema for "auth/login" route
     * @return {Joi}
     */
    static updateCurrencySchema() {
        return Joi.object({
            currency: Joi.string()
            // accepts currency only as letters
            .regex(/^[A-Za-z]+$/)
            .trim()
            .messages({'string.pattern.base': `Currency is required`})
            .required().label('status')
            ,
        });
    }
    
     /**
     * @description update transaction data validator
     * @return {Joi}
     */
    static updateTransactionSchema() {
        return Joi.object({
            status: Joi.string()
            // accepts firstName only as letters and converts to lowercase
            .regex(/^[A-Za-z]+$/)
            .trim()
            .messages({'string.pattern.base': `status is required`})
            .required().label('status')
            ,
        });
    }


 /**
     * @description update usrAccountType data validator
     * @return {Joi}
     */
    static updateAccountTypeSchema() {
        return Joi.object({
            accountTYpe: Joi.string()
            // accepts firstName only as letters and converts to lowercase
            .regex(/^[A-Za-z]+$/)
            .trim()
            .messages({'string.pattern.base': `accountType is required`})
            .required().label('accountTYpe')
            ,
        });
    }

     /**
     * @description withdrawal data validator
     * @return {Joi}
     */
    static withdrawalSchema() {
        return Joi.object({
            amount: Joi.string()
            // accepts firstName only as letters and converts to lowercase
            .lowercase()
            .trim()
            .messages({'string.pattern.base': `Amount is required`})
            .required().label('amount'),
            currency: Joi.string()
            // accepts firstName only as letters and converts to lowercase
            .regex(/^[A-Za-z]+$/)
            .lowercase()
            .trim()
            .required().label('currency')
        });
    }
    

    /**
     * @description defines the req.body schema for "user/signup" route
     * @return {Joi}
     */
    static signupSchema() {
        return Joi.object({
            firstName: Joi.string()
                // accepts firstName only as letters and converts to lowercase
                .regex(/^[A-Za-z]+$/)
                .lowercase()
                .trim()
                .required().label('firstname')
                ,
            lastName: Joi.string()
                // accepts lastName only as letters and converts to lowercase
                .regex(/^[A-Za-z]+$/)
                .lowercase()
                .trim()
                .required(),
            country: Joi.string()
                // accepts country only as letters and converts to lowercase
                .regex(/^[A-Za-z]+$/)
                .lowercase()
                .trim()
                .required(),
            accountType: Joi.string()
                // accepts accountType only as letters and converts to lowercase
                .regex(/^[A-Za-z]+$/)
                .lowercase()
                .trim()
                .required(),
            defaultCurrency: Joi.string()
                // accepts defaultCurrency only as letters and converts to lowercase
                .regex(/^[A-Za-z]+$/)
                .lowercase()
                .trim()
                .required(),
            // accepts name only as letters and converts to lowercase
            email: Joi.string().email().lowercase().required(),
            password: Joi.string()
                // Minimum eight characters, at least one letter, one number and one special character:
                .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
                .min(8)
                .required()
                .strict()
                .strict(),
        });
    }

     /**
     * @description defines the req.body schema for "auth/adminSignup" route
     * @return {Joi}
     */
    static adminSignupSchema() {
        return Joi.object({
            firstName: Joi.string()
                // accepts firstName only as letters and converts to lowercase
                .regex(/^[A-Za-z]+$/)
                .lowercase()
                .trim()
                .required().label('firstname')
                ,
            lastName: Joi.string()
                // accepts lastName only as letters and converts to lowercase
                .regex(/^[A-Za-z]+$/)
                .lowercase()
                .trim()
                .required(),
            country: Joi.string()
                // accepts country only as letters and converts to lowercase
                .regex(/^[A-Za-z]+$/)
                .lowercase()
                .trim()
                .required(),
            accountType: Joi.string()
                // accepts accountType only as letters and converts to lowercase
                .regex(/^[A-Za-z]+$/)
                .lowercase()
                .trim()
                .required(),
            // accepts name only as letters and converts to lowercase
            email: Joi.string().email().lowercase().required(),
            password: Joi.string()
                // Minimum eight characters, at least one letter, one number and one special character:
                .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
                .min(8)
                .required()
                .strict()
                .strict(),
        });
    }

 

}

// exports class as module
module.exports = Authentication;
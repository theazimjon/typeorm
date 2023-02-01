import Joi from "joi";
import AppError from "../helpers/app.error"
import REGEXES from "../helpers/regex.variables";
import {FACTORY_DTO_TYPES} from "../types/factory.dto.enums";

export default function(type : any, name : string, minValue: number = 0, maxValue: number = 100) {
    let msg = `"Invalid ${name || type} `;

    function valMaker(fn, defaultMsg = true){
        if(defaultMsg)
            msg += ` (length ${minValue} - ${maxValue})`;

        return fn.min(minValue).max(maxValue).error(() => new AppError(msg, 403));
    }
    switch(type){
        case FACTORY_DTO_TYPES.Number:
            msg += "/Please enter a number/"
            return valMaker(Joi.number())
        case FACTORY_DTO_TYPES.Integer:
            msg += "/Please enter a integer number/"
            return valMaker(Joi.number().integer())
        case FACTORY_DTO_TYPES.String:
            msg += "/Please enter a string/"
            return valMaker(Joi.string())
        case FACTORY_DTO_TYPES.Email:
            msg += "/Please enter an email address/"
            return valMaker(Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }))
        case FACTORY_DTO_TYPES.Password:
            msg += "/Please enter strong password which is have at least one upper and lower case letter, a symbol and a number/"
            return valMaker(Joi.string().pattern(new RegExp(REGEXES.password)))
        case FACTORY_DTO_TYPES.ID:
            msg += "/Please enter an mongoDB valid id/"
            return valMaker(Joi.string().hex().length(24))
    }
}

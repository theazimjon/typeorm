import Joi from "joi";
import AppError from "../helpers/app.error";
import factoryDto from "./factory.dto";
import {FACTORY_DTO_TYPES} from "../types/factory.dto.enums";

export const requiredFields = (...fields) => {
    if(fields.every(field => field !== undefined && field !== null))
        return true;

    throw new AppError(`Please provide all required ${fields.length} fields`, 403)
}

export const Query = Joi.object({
    page: factoryDto(FACTORY_DTO_TYPES.Integer, "page", 1),
    count:factoryDto(FACTORY_DTO_TYPES.Integer,"count", 1, 50),
    sort: factoryDto(FACTORY_DTO_TYPES.String, "sort")
});

const Id = Joi.object({ id: factoryDto(FACTORY_DTO_TYPES.ID, 'ID')});

export const IdDto = (body) => {
    const {id} = body;
    requiredFields(id);
    return Id.validateAsync(body);
}

export const queryGetWithPagination = (body) => Query.validateAsync(body);

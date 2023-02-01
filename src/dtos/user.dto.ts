import Joi from 'joi';
import factoryDto from "../dtos/factory.dto";
import {FACTORY_DTO_TYPES} from "../types/factory.dto.enums";
import {requiredFields} from "../dtos/common.dto";

const schemaObj = {
    id: factoryDto(FACTORY_DTO_TYPES.ID, "user id"),
    firstName: factoryDto(FACTORY_DTO_TYPES.String, "first name", 3, 30),
    lastName:  factoryDto(FACTORY_DTO_TYPES.String, "last name", 3, 30),
    email: factoryDto(FACTORY_DTO_TYPES.Email, "email"),
    password: factoryDto(FACTORY_DTO_TYPES.Password, 'Password', 8, 16),
    newPassword: factoryDto(FACTORY_DTO_TYPES.Password, "new password", 8, 16),
}

const UserJoiObject = Joi.object(schemaObj);

export const UserDto = {
    default: (body) => UserJoiObject.validateAsync(body),
    create: (body) => {
        const {firstName, lastName, email, password} = body;

        requiredFields(firstName, lastName, email, password);

        return UserJoiObject.validateAsync(body);
    },
    output: (object) => ({
        id: object?.id,
        firstName: object.firstName,
        lastName: object.lastName,
        email: object.email,
    }),
    login: (body) => {
        const {email, password} = body;

        requiredFields(email, password);

        return UserJoiObject.validateAsync(body);
    },
}

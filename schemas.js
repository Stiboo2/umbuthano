const Joi = require('joi');

module.exports.inyangaSchema = Joi.object({
    inyanga: Joi.object({
        title:Joi.string(),
        name: Joi.string(),
        surname: Joi.string().required(),
        nicName: Joi.string(),
        massege: Joi.string().required(),
        location: Joi.string(),
        contact: Joi.number().required(),
        image: Joi.string()

    }).required()
});
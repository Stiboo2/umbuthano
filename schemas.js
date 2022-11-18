const Joi = require('joi');

module.exports.inyangaSchema = Joi.object({
    campground: Joi.object({
        name: Joi.string().required(),
        surname: Joi.string().required(),
        title: Joi.string().required(),
        contact: Joi.number().required()
    }).required()
});
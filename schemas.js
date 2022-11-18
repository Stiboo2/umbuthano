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

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})
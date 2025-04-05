import Joi from 'joi'

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  masterKey: Joi.string().required(),
})

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
      )
    )
    .min(8)
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
    }),
  masterKey: Joi.string().required(),
})

export const addCategorySchema = Joi.object({
  name: Joi.string().max(15).min(2).required(),
})

export const deleteCategorySchema = Joi.object({
  categoryId: Joi.string().required(),
})

export const editCategorySchema = Joi.object({
  categoryId: Joi.string().required(),
  name: Joi.string().required(),
})

export const deleteProjectSchema = Joi.object({
  id: Joi.string().required(),
})

export const addTestimonialSchema = Joi.object({
  name: Joi.string().required(),
  review: Joi.string().required(),
  role: Joi.string().required(),
})

export const deleteTestimonialSchema = Joi.object({
  id: Joi.string().required(),
})
export const addTeamSchema = Joi.object({
  name: Joi.string().required(),
  role: Joi.string().required(),
})

export const deleteTeamSchema = Joi.object({
  id: Joi.string().required(),
})

export const updateTeamSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string(),
  role: Joi.string(),
})

export const editCompanyDetails = Joi.object({
  email: Joi.string().email(),
  address: Joi.string(),
  contact: Joi.string(),
  facebookLink: Joi.string().uri().allow(''),
  tiktokLink: Joi.string().uri().allow(''),
  youtubeLink: Joi.string().uri().allow(''),
  instagramLink: Joi.string().uri().allow(''),
})

export const deleteCompanyDetailsSchema = Joi.object({
  id: Joi.string().required(),
})

export const editTestimonialSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string(),
  role: Joi.string(),
  review: Joi.string(),
})

export const addContactSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  contactNumber: Joi.number().max(9999999999).required(),
  message: Joi.string().required(),
})

export const toggleViewStatusSchema = Joi.object({
  _id: Joi.string().required(),
})

export const deleteContactSchema = Joi.object({
  _id: Joi.string().required(),
})

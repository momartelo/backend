import { header, param, body } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import { applyValidations } from '../../middlewares/apply-validations.js';

export const createPostValidations = [
  body('title')
    .notEmpty().withMessage('El campo { title } no debe estar vacio.')
    .isString().withMessage('El campo { title } debe ser un string.'),
  body('description')
    .notEmpty().withMessage('El campo { description } no debe estar vacio.')
    .isString().withMessage('El campo { description } debe ser un string'),
  body('image')
    .isString().withMessage('El campo { avatar } debe ser un string.')
    .isURL().withMessage('El campo { avatar } debe ser una URL válida.'),
  applyValidations,
];

export const listPostValidations = [
  header('authorization').exists(),
  applyValidations,
];

export const getPostValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id valida.'),
  applyValidations,
];

export const updatePostValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id valida.'),
  body('title')
    .optional()
    .notEmpty().withMessage('El campo { title } no debe estar vacio.')
    .isString().withMessage('El campo { title } debe ser un string.'),
  body('description')
    .notEmpty().withMessage('El campo { description } no debe estar vacio.')
    .isString().withMessage('El campo { description } debe ser un string'),
  body('image')
    .isString().withMessage('El campo { avatar } debe ser un string.')
    .isURL().withMessage('El campo { avatar } debe ser una URL válida.'),
  applyValidations,
];

export const deletePostValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id valida.'),
  applyValidations,
];

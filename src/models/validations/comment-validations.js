import { body, param } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import { applyValidations } from '../../middlewares/apply-validations.js';

export const createCommentValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id valida.'),
  body('comment')
    .notEmpty().withMessage('El campo { comment } no debe estar vacio.')
    .isString().withMessage('El campo { comment } debe ser un string.'),
  applyValidations,
];

export const listCommentValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id valida.'),
  applyValidations,
];

export const deleteCommentValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id valida.'),
  param('commentId')
    .notEmpty().withMessage('El parametro { commentId } no debe estar vacio.')
    .isString().withMessage('El parametro { commentId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { commentId } debe ser una id valida.'),
  applyValidations,
];

export const getCommentValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { playListId } debe ser una id valida.'),
  param('commentId')
    .notEmpty().withMessage('El parametro { commentId } no debe estar vacio.')
    .isString().withMessage('El parametro { commentId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { commentId } debe ser una id valida.'),
  applyValidations,
];

export const updateCommentValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id valida.'),
  param('commentId')
    .notEmpty().withMessage('El parametro { commentId } no debe estar vacio.')
    .isString().withMessage('El parametro { commentId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { commentId } debe ser una id valida.'),
  body('comment')
    .optional()
    .notEmpty().withMessage('El campo { comment } no debe estar vacio.')
    .isString().withMessage('El campo { comment } debe ser un string.'),
  applyValidations,
];

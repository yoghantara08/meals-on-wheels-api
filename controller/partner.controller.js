const express = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const Partner = require("../models/partner.model");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

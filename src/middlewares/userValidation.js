function functionValidatesEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const userValidation = (req, _res, next) => {
  const { displayName, email, password } = req.body;
  const validate = functionValidatesEmail(email);
  if (displayName.length < 8) {
    const err = { statusCode: 400,
      message: '"displayName" length must be at least 8 characters long',
    };
    return next(err);
  } if (!validate) {
    const error = { statusCode: 400, message: '"email" must be a valid email' };
    return next(error);
  } if (password.length < 6) {
    const errorr = { statusCode: 400,
      message: '"password" length must be at least 6 characters long',
    };
    return next(errorr);
  } 
  next();
};

module.exports = userValidation;
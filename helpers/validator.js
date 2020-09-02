const validate = (schema, data) => {
  const errors = schema.validate(data);

  if (!errors.error) return true;

  return false;
};

module.exports = validate;

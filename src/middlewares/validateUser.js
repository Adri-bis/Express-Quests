const validateUser = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const { firstname, lastname, email, city, language } = req.body;
  const errors = [];
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  if (firstname == null) {
    errors.push({ field: "firstname", message: "This field is required" });
  } else if (firstname.length >= 255) {
    errors.push({
      field: "firstname",
      message: "To more characters, need 255 Max",
    });
  }
  if (lastname == null) {
    errors.push({ field: "lastname", message: "This field is required" });
  } else if (lastname.length >= 255) {
    errors.push({
      field: "lastname",
      message: "To more characters, need 255 Max",
    });
  }
  if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Invalid email" });
  } else if (email.length >= 255) {
    errors.push({
      field: "email",
      message: "To more characters, need 255 Max",
    });
  }
  if (city == null) {
    errors.push({ field: "city", message: "This field is required" });
  } else if (city.length >= 255) {
    errors.push({
      field: "city",
      message: "To more characters, need 255 Max",
    });
  }
  if (language == null) {
    errors.push({ field: "language", message: "This field is required" });
  } else if (language.length >= 255) {
    errors.push({
      field: "language",
      message: "To more characters, need 2555 Max",
    });
  }
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = validateUser;

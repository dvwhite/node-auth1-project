module.export = (req, res, next) => {
  const { username, password } = req.headers;

  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({
      message: "Invalid credentials",
      validation: [],
      data: {}
    })
  }
};
const Response = require('express')

const RequestFailed = async (
  res,
  code,
  error,
  id
) => {
  let composeMessage = "";

  if (code === 400) {
    composeMessage = `${error} cannot be null`;
  } else if (code === 404) {
    if (id) {
      composeMessage = `${error} not found with id ${id}`;
    } else {
      composeMessage = `${error} not found`;
    }
  } else if (code === 401 || code === 403 || code === 409) {
    composeMessage = error;
  }

  res.status(code).json({
    success: false,
    code: code,
    message: composeMessage,
  });
};

module.exports = RequestFailed

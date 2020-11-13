const successStatusType = 'success';
const userErrorStatusType = 'warning';
const serverErrorStatusType = 'error';

// Return a response with 200 status code and specified message
exports.OK = (res, message, additionalFields = {}) => {
  return res.status(200).json({
    statusType: successStatusType,
    statusMessage: message,
    ...additionalFields,
  });
};

// Return a response with specified status code and message
exports.Success = (res, statusCode, message, additionalFields = {}) => {
  return res.status(statusCode).json({
    statusType: successStatusType,
    statusMessage: message,
    ...additionalFields,
  });
};

// Return a response with 500 status code and a message apologizing for server error
exports.ServerError = (res, additionalFields = {}) => {
  return res.status(500).json({
    statusType: serverErrorStatusType,
    statusMessage:
      'Sorry, we cannot process your request right now.  Please try again later!',
    ...additionalFields,
  });
};

// Return a response with specified status code and message (meant for user error only)
exports.UserError = (res, statusCode, message, additionalFields = {}) => {
  return res.status(statusCode).json({
    statusType: userErrorStatusType,
    statusMessage: message,
    ...additionalFields,
  });
};

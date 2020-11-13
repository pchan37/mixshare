const successStatusType = 'success';
const userErrorStatusType = 'warning';
const serverErrorStatusType = 'error';

exports.OK = (res, message, additionalFields = {}) => {
  return res.status(200).json({
    statusType: successStatusType,
    statusMessage: message,
    ...additionalFields,
  });
};

exports.Success = (res, statusCode, message, additionalFields = {}) => {
  return res.status(statusCode).json({
    statusType: successStatusType,
    statusMessage: message,
    ...additionalFields,
  });
};

exports.ServerError = (res, additionalFields = {}) => {
  return res.status(500).json({
    statusType: serverErrorStatusType,
    statusMessage:
      'Sorry, we cannot process your request right now.  Please try again later!',
    ...additionalFields,
  });
};

exports.UserError = (res, statusCode, message, additionalFields = {}) => {
  return res.status(statusCode).json({
    statusType: userErrorStatusType,
    statusMessage: message,
    ...additionalFields,
  });
};

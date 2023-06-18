
exports.responseSuccess = async (res,message,data) => {
  return res.status(200).json({
    success: true,
    code: 200,
    message: message,
    data : data ? data : {}
  });
  };
  


exports.responseSuccess = async (res,message,data) => {
  return res.status(200).json({
    success: true,
    code: 200,
    message: message,
    data : data ? data : {}
  });
  };

  exports.dublicateResponse = async (res,message,data) => {
    return res.status(200).json({
      success: true,
      code: 409,
      message: message + "already Exist",
      data : data ? data : {}
    });
    };
  

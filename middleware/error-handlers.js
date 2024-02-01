const { CustomAPIError} = require("../errors/custom-api-errors")

const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof CustomAPIError){
        return  res.status(err.statuscode).json({msg: err.message})

    }
    return res.status(500).json({msg: "Something went wrong, please try again"})
}

module.exports = errorHandlerMiddleware
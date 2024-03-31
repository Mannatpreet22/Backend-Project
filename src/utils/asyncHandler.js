const asyncHandler = (requestHandler)=>{        //  Method -2 
    return (req,res,next) =>{
        Promise
        .resolve(requestHandler(req,res,next))
        .catch(err =>{next(err)})
    }
}

export {asyncHandler}




/*
    Method - 1
    const asyncHandler = (func) => async (req,res,next) =>{
        try
        {
            await fn(req,res,next)
        }
        catch(err)
        {
            res.status(err.code || 500).json({
                success: false,
                message : err.message
            })
        }
    }
*/
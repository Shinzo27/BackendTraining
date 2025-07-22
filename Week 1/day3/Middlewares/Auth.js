const user = false

export function checkAuth(req,res,next) {
    if(user) {
        return next()
    } else { 
        return res.json({
            message: "You are not authorized to access this route!"
        })
    }
}
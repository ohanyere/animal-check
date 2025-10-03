export const handler = (err, reg, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    next()
        res.json({
            message : err.message,
            stack : process.env.NODE_ENV = "development" ? err.stack : null
        })
}


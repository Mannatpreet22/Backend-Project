class ApiResponse {
    constructor(statusCode,message = 'Success',data,success){
        this.statusCode = statusCode,
        this.message = message,
        this.success = success < 400,
        this.data = data
    }
}

export {ApiResponse}
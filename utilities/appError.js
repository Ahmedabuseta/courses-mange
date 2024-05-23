
class appError extends Error {
    constructor(){
        super();
    }

    create(statusCode,message){
        this.message = message;
        this.statusCode =statusCode;
        return this;
    }
}
module.exports = new appError();
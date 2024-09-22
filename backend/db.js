const mongoose = require('mongoose')
const monogoURI = "mongodb://localhost:27017/iNotebook"

const connectToMongo = ()=>{
    mongoose.connect(monogoURI,()=>{
        console.log("connected to mongo ...");
    })
}
module.exports = connectToMongo;
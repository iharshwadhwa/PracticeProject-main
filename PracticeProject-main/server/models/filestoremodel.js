const mongoose=require("mongoose")

const fileSchema=new mongoose.Schema({
    name:{
        type:String
    },
    avatar:{
        fileName:String,
        path:String
    }
})

const fileSchemaModel=mongoose.model ('fileSchemaModel',fileSchema)

module.exports=fileSchemaModel;
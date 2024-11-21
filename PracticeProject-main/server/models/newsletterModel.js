const mongoose=require("mongoose");

const newsletterSchema=new mongoose.Schema({
    title:{
        type:String
    },
    author:{
        type:String,
    },
    date:{
        type:String,
        require:true
    },
    imageUrl:{
        type:String,
    },
    description:{
        type:String,
        require:true
    }
},

{timestamps:true,}

)
 
const News=mongoose.model('News',newsletterSchema)

module.exports=News

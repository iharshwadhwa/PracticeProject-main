const express = require ("express")
const connectDb = require("./config/dbConnection")
const mongoose=require("mongoose")
const errorHandler = require("./middleware/errorHandler")
const hbs = require("hbs");
const cors = require("cors")
const multer=require("multer")
// const upload = multer({ dest: 'uploads/' })
const jwt=require("jsonwebtoken")
const fileSchemaModel=require("./models/filestoremodel")



//env file config
const dotenv=require("dotenv");

dotenv.config();

connectDb()


const app = express()
const port = process.env.PORT || 5000


hbs.registerPartials(__dirname + '/views/partials'); // Path to your partials


app.use(express.json())
app.use(cors())

app.use("/api/user",require("./routes/userRoutes"))
app.use("/api/doctors", require("./routes/docRoutes"));
app.use("/uploads", express.static("uploads"));
app.use("/api/newsletter",require("./routes/newsletterRoutes"))

app.set("view engine", "hbs");

app.use(errorHandler)



app.get("/home",async (req,res)=>{

    const filepics = await fileSchemaModel.find();
    res.render("home", { filepics });
})

const storage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        const  uniqueSuffix=Date.now()
        cb(null,file.fieldname+'-'+uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//     // req.file is the avatar file
//     // req.body will hold the text fields, if there were any

//     console.log(req.body)
//     console.log(req.file)
    

//     return res.redirect("/home")
// })

app.post('/profile',upload.single('avatar'),async function(req,res,next){

    const {name}=req.body;
    const {filename , path}=req.file

    const newFile=new fileSchemaModel ({
        name,
        avatar:{
            filename ,
            path
        }
    })

    await newFile.save()

    console.log("Profile Saved")

    res.redirect("/home")

})
app.get("/getPhotos", async (req, res) => {
    try {
        const uploads = await fileSchemaModel.find(); // Fetch all uploaded photos from the database
        res.render("home", { uploads }); // Pass the photos to the template

    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching photos");
    }
});






app.get("/allusers",(req,res)=>{
    res.render("users",{

        people:[
            {
                username:"himansh",
                age:20
            },
            {
                username:"mahajan",
                age:21
            }
        ]

    })
})


app.listen(port, ()=>{
    console.log("Server is running on port 3001")
})



































// mongoose.connect('mongodb://127.0.0.1:27017/HealthCare System', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });


// const mySchema=new mongoose.Schema({
//     name:String,
//     age:Number
// })

// const User= mongoose.model('User',mySchema)
// app.get("/", (req,res)=>{
//     res.send("Hello World")
// })

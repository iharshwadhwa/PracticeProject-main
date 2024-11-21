const express=require("express")
const router=express.Router();

const{getNewsletter, createNewsletter}=require("../controllers/newsletterController")

router.get("/getnewsletter",getNewsletter)
router.post("/creatingnewsletter",createNewsletter)

module.exports=router
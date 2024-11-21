const express=require("express")
const asyncHandler=require("express-async-handler")
const Newsletter=require("../models/newsletterModel")


const getNewsletter=asyncHandler(async(req,res)=>{
    try {
        const data=await Newsletter.find({});
        res.json({data})

    } catch (error) {
        return res.status(404).json({error:error.message})
    }
})

const createNewsletter=asyncHandler(async(req,res)=>{


    const newsletter=await Newsletter.create({
        title:req.body.title,
        author:req.body.author,
        date:req.body.date,
        imageUrl:req.body.imageUrl,
        description:req.body.description
    })

    res.json(newsletter)


})


exports.getNewsletter=getNewsletter;
exports.createNewsletter=createNewsletter

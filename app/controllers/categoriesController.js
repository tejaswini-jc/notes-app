const {Category}=require('../models/category')
const Note=require('../models/note')
module.exports.list=(req,res)=>
{
    Category.find({user:req.user._id})
    .then((categories)=>{
        res.json(categories)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.create=(req,res)=>
{
const body=req.body
const category=new Category(body)
category.user=req.user._id
category.save()
.then((category)=>
{
    res.json(category)
})
.catch((err)=>
{
    res.json(err)
})
}

module.exports.show=(req,res)=>
{const id =req.params.id
    Promise.all([Category.findOne({_id:id,user:req.user._id}),Note.find({category:id,user:req.user._id})])
    .then((values)=>
    {
        const [category,notes]=values
        const categoryObj=category.toObject()
        categoryObj.notes=notes
        res.json({
            ...categoryObj
        })
    })
}
module.exports.update=(req,res)=>
{
    const id=req.params.id
    const body=req.body
    Category.findByIdAndUpdate({_id:id,user:req.user._id},body,{new:true,runValidators:true})
    .then((category)=>{
        if(category){
            res.json(category)
        }
        else{
            res.json({})
        }
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.destroy=(req,res)=>
{
    const id=req.params.id

Category.findByIdAndDelete({_id:id,user:req.user._id})
.then((category)=>{
    if(category){
        res.json(category)
    }
    else{
        res.json({})
    }
})
.catch((err)=>{
    res.json(err)
})
}
const blog = require('../models/blogModel')
exports.getBlogDetail = (req,res,next) => {
    console.log(req.params);
    blog.findById(req.params.account,function (err,blog) {
        
        if(err){
            return res.json({
                success:'false',
                err:err.message})
        }
        else{
            res.json({
                success:'true',
                data:blog
            })
        }
    })
}
exports.getPosts = (req,res,next) =>{
    console.log("get posts called !");
    res.status(200).json({
        message:"success GET posts"
    })
}

exports.postPosts = (req,res,next) =>{
    console.log("post posts called !");
    console.log(req.body.f_name);
    console.log(req.headers);
    res.status(200).json({
        ...req.body,
        message:"success Post posts"
    })
}
exports.getPosts = (req,res,next) =>{
    console.log("get posts called !");
    res.status(200).json({
        message:"success GET posts"
    })
}

exports.postPosts = (req,res,next) =>{
    console.log("post posts called !");
    res.status(200).json({
        message:"success Post posts"
    })
}
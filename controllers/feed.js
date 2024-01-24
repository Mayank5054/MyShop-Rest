exports.getPosts = (req,res,next) =>{
    console.log("get posts called !");
    res.status(200).json({
        message:"success GET posts"
    })
}

exports.postPosts = (req,res,next) =>{
    console.log("post posts called !");
    // console.log(req.body.f_name);
    // console.log(req.headers);
/*** sample code to handle post data 
//     fetch("http://localhost:5354/feed/posts",{
//     method:"POST",
//     body: JSON.stringify({
//     name:"mayank"
//   }),
//     headers:{
//       "Content-Type":"application/json"
//     }
//   })
//   .then(result => result.json())
//   .then(result => {
//     console.log(result);
//   })

***/

    console.log(req.body);
    res.status(200).json({
        ...req.body,
        message:"success Post posts"
    })
}
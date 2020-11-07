var express = require("express");
var router = express.Router();
const user = require("../sql/user");

router.get("/", function (req, res, next) {
  res.render("register");
});


router.post("/in", function (req, res, next) {
  console.log("进入register1   /in里面了");
  let obj = req.body;
//   //重复用户的解决问题
//   user.insertMany(obj,(err,data)=>{
//     if(err) {
//         console.log(err)
//     }
//     console.log(data)

//     if(data) {
//         res.redirect('/login3')
//     }else {
//         res.redirect('/register3')
//     }

// })


    //解决用户重复的第二种写法
    user.findOne({username:obj.username},(err,data)=>{
        if(err){
            //发送错误日志 可以写进数据库
            console.log(err)
        }
        if(data) {
            res.redirect('/register1')
        }else {
            user.insertMany(obj,(err,data)=>{
                if(err) {
                    console.log(err)
                } 
                console.log(data);
                res.redirect('/login1')
            })
        }
    });
})

module.exports = router
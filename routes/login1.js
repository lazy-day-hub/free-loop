var express = require('express');
var router = express.Router();
const user = require("../sql/user");

router.get('/',(req,res,next)=>{
    console.log('此时进入login1');
    res.render('login');
})

router.post('/in',(req,res,next)=>{
    console.log('进入login1的in处理');
    let obj = req.body;
    user.findOne(obj,(err,data)=>{
        if(err){
            console.log(err);
        }
        if(data){
            //response  服务器和你说 你的肚子里面 cookie那个位置 给我存上islogin = 0k
            // res.cookie('islogin','ok')
            req.session.islogin = 'ok'
            //注意 这里是req 设置的 实在服务器端设置的 因为要先分裂成一个对象 
            //给前端一个 后端藏一个  前端通过给的那一个加密的来找信息
            console.log('我在login路由/in');
            res.redirect('/');
        }else{
            console.log('进入注册');
            res.redirect('/register1');
        }
    })
})

module.exports = router;
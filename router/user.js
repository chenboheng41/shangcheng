//引入上一级目录下的mysql连接池对象
const pool=require('../pool.js');
const express=require('express');
//创建空路由器
const cors=require('cors');
var router=express.Router();
//配置允许访问列表
router.use(cors({
  origin:{
    "Access-Control-Allow-Origin":"*"
  },
  credentials:true
}))
// 引入express-session模块
const session=require("express-session");
router.use(session({
    // 配置模块
    secret:"128位随机字符串",
    resave:false,
    saveUninitialized:true,
    cookie:{
    maxAge:1000*60*60
    }
}))

//1.用户注册
router.get("/register",(req,res)=>{
	var $uname=req.query.uname;
	var $upwd=req.query.upwd;
	var $email=req.query.email;
	var $phone=req.query.phone;
	var $userName=req.query.userName;
	//1.检验用户是否存在
	var sql="select * from sp_user where uname=?"
	pool.query(sql,[$uname],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("1");
		}else{
			var sql="insert into sp_user values(null,?,?,?,?,?)";
			pool.query(sql,[$uname,$upwd,$email,$phone,$userName],(err,result)=>{
				if(err) throw err;
				res.send("0");
			});
		} 
	});
});

//2.用户登录
router.post('/login',(req,res)=>{
	//获取post数据请求
	var obj=req.body;
	var $uname=obj.uname;
	var $upwd=obj.upwd;
	//判断输入数据是否为空
	if(!$uname){
		res.send({code:401,msg:'用户名不存在'});
		return;
	}
	if(!$upwd){
		res.send({code:402,msg:'密码不存在'});
		return;
	}
	

	//执行sql语句查看是否登陆成功
	var sql="select * from sp_user where uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		// console.log(result)
		if(err) throw err;
		if(result.length>0){
			res.send("1");
		}else{
			//保存id到uid
      var uid=result[0].id;
			req.session.uid=uid;
			req.session.uid.save();
			res.send("0");
		}
	});
});

// 购物车 
router.get("/shopcart",(req,res)=>{
	var uid=1;
	var sql="select id,uid,pid,price,pname,img,count from sp_cart where uid=?"
	pool.query(sql,[uid],(err,result)=>{
			if(err)throw err ;
			res.send({code:1,data:result})
			// console.log(result)
	})
})//购物车结束

// 添加购物车开始
router.get("/addcart",(req,res)=>{
	// 获取参数 
	var uid=1;
	var pid=req.query.lid;
	var pname=req.query.pname;
	var price=req.query.price;
	var img=req.query.img;
	var val=req.query.val;
	// console.log(img);
	// 查询购物车是否有这些参数
	var sql="select id from sp_cart where uid=? AND pid=?";
	pool.query(sql,[uid,pid],(err,result)=>{
			if(err) throw err;
			if(result==0){
					// 如果没有就添加商品
					var sql=`insert into sp_cart values(null,${uid},${pid},${price},'${pname}','${img}',${val})`
			}else{
					//否则就给数量count 加一
					var sql=`update sp_cart set count=count+${val} where uid=${uid} AND pid=${pid}`
			}
			pool.query(sql,(err,result)=>{
					if(err) throw err;
					res.send("1")
			});
	});
});//添加购物车结束

// 购物车商品删除
router.get("/delet",(req,res)=>{
	var id=req.query.id;
	id=parseInt(id);
	var sql="delete from sp_cart where id=?"
	pool.query(sql,[id],(err,result)=>{
			if(err) throw err;
			// 判断sql语句印象的行数
			if(result.affectedRows>0){
					res.send({code:1,msg:"删除成功"})
			}else{
					res.send({code:-1,msg:"删除失败"}) 
			}
	}) 
})


//导出路由器
module.exports=router;

// 登录格式验证







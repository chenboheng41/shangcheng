const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/",(req,res)=>{
  var output={
    product:[/*title,subtitle,..*/],
    pics:[/*{sm,md,lg},{sm,md,lg},...*/],
    specs:[/*{lid,spec},{lid,spec},...*/]
  }
  // 配置跨域请求
  res.writeHead(200,{
    "Access-Control-Allow-Origin":"*"
  });
  var lid=req.query.lid;
  console.log(lid);
  if(lid!==undefined){
    //查询一个商品的详细信息
    var sql="select * from sp_phone where pid=?";
    pool.query(sql,[lid],(err,result)=>{
      if(err) console.log(err);
        if(result.length!=0){
          //result:[{product}]
          output.product=result[0];
          console.log(output.product);
          //查询图片列表
          var sql="select * from sp_phone_pic where family_id=?";
          pool.query(sql,[lid],(err,result)=>{
            if(err) console.log(err);
            //result:[{sm,md,lg},{sm,md,lg},...]
            output.pics=result;
            console.log(result);
            //查询规格列表
            var family_id=output.product["family_id"];
            var sql="select pid,spec,color,family_id from sp_phone where family_id=?";
            pool.query(
              sql,[family_id],(err,result)=>{
                if(err) console.log(err);
                output.specs=result;
                //将完整结果回发客户端
                res.write(JSON.stringify(output));
                res.end();
              }
            );
          })
        }else{
          res.write(JSON.stringify(output));
          res.end();
        }
      });
  }else{
    res.write(JSON.stringify(output));
    res.end();
  }
})
//功能一:用户点击添加购物车按钮
router.get("/addcart",(req,res)=>{
	//0:向数据表 sp_cart 添加一列count INT
	//ALTER TABLE sp_cart ADD count INT;
	//UPDATE sp_cart SET count = 1;
  //1:获取参数 uid pid pname price
  // 配置跨域请求
  res.writeHead(200,{
    "Access-Control-Allow-Origin":"*"
  });
	var uid = 1;
	var pid = req.query.pid;
	var pname =  req.query.pname;
	var price =  req.query.price;
	//2:判断用户是否登录
	//3:如果当前用户未登录 程序停止
	//  返回出错信息  请登录
	//4:创建sql语句查询当前用户是否添加过此商品
	var sql = "SELECT id FROM sp_cart";
	sql+=" WHERE uid = ? AND pid = ?";
	pool.query(sql,[uid,pid],(err,result)=>{
		 if(err)throw err;
		 //回调函数:什么时候执行函数
		 //sql语句执行完毕并且返回结果
		 if(result.length==0){
			 var sql = `INSERT INTO sp_cart`;
			 sql+=` VALUES(null,${uid},${pid},${price},'${pname}',1)`;
		 }else{//10:34
			 var sql = `UPDATE sp_cart SET`;
			 sql+=` count=count+1`;
			 sql+=` WHERE uid = ${uid} AND pid=${pid}`;
		 }
		 pool.query(sql,(err,result)=>{
			 if(err)throw err;
			 res.send({code:1,msg:"添加成功"})
		 }); 
		})
	});
module.exports=router;
const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/",(req,res)=>{
  // var pid=req.query.pid;
  //查询一个商品的详细信息
  
  //配置跨域请求
    res.writeHead(200,{
      "Access-Control-Allow-Origin":"*"
    });
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
	//为参数获取默认值
  if(!pno){pno[0]=1};
  // console.log(pno);
	if(!pageSize){pageSize=15};    
	//创建sql语句
	var sql="select pid,title,pic,price from sp_product limit ?,?"
	//计算开始记录数
  var offset=(pno-1)*pageSize;
  // console.log(offset);
  // console.log(pageSize);
  // var pageCount=(total+pageSize-1)/pageSize;
	pageSize=parseInt(pageSize);
	pool.query(sql,[offset,pageSize],(err,result)=>{
			if(err) console.log(err);
      // console.log(result)
      res.write(JSON.stringify(result));
      res.end();
	})
  
})

//功能二:商品分页显示
//get /getProducts
//获取用户参数 pno pageSize
// router.get("/getProducts",(req,res)=>{
	
// })
module.exports=router;
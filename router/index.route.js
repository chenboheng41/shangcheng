const express=require("express")
const router=express.Router();
const pool=require("../pool");
//http://localhost:3001/index
//app.use("/index",index)
//   ↓
//http://localhost:3001/index/
router.get("/",(req,res)=>{
  var sql=`select * from sp_index_product where seq_recommended!=0 order by seq_recommended `;
  pool.query(sql,[],(err,result)=>{
    if(err) console.log(err);
    res.writeHead(200,{
      "Access-Control-Allow-Origin":"*"
    });//writeHead在相应过程中只能写1次，再写会冲突报错
    //res.send(result);//express
    //包括:{
    //  res.writeHead(200,{...})
    res.write(JSON.stringify(result))
    res.end();
    //}
  })
})

module.exports=router;


/**用户信息表**/
CREATE TABLE sp_user(
	id INT PRIMARY KEY AUTO_INCREMENT,   #用户ID
	uname VARCHAR(32),                         
	upwd VARCHAR(32),
	email VARCHAR(64),
	phone VARCHAR(16) unique,	
	userName VARCHAR(32)              #用户真实姓名
);

/**用户地址表**/
CREATE TABLE sp_receiver_address(
	aid INT PRIMARY KEY AUTO_INCREMENT,   
	userId INT,               #用户编号
	FOREIGN KEY(userId) REFERENCES sp_user(id), #用户编号为用户ID
	receiver VARCHAR(16),           #接收人姓名
	province VARCHAR(16),           #省
	city VARCHAR(16),               #市
	county VARCHAR(16),             #县
	address VARCHAR(128),           #详细地址
	callphone VARCHAR(16),          #手机
	fixedphone VARCHAR(16),         #固定电话
	postcode VARCHAR(6),            #邮编
	tag VARCHAR(16),                #标签名
	is_default BOOL                 #是否为当前用户的默认地址
);

/**用户购物车表**/
CREATE TABLE sp_shopping_cart(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	userId INT,           #用户编号
  FOREIGN KEY(userId) REFERENCES sp_user(id),
	productId INT,          #商品编号
####FOREIGN KEY(productId) REFERENCES sp_laptop_family(fid),
	count INT               #购买数量
);

/**用户订单**/
CREATE TABLE sp_order(
	aid INT PRIMARY KEY AUTO_INCREMENT,
	userId INT,              #用户编号
	FOREIGN KEY(userId) REFERENCES sp_user(id),  #用户编号为用户ID
	addressId INT,           
	FOREIGN KEY(addressId) REFERENCES sp_receiver_address(aid),
	status INT,     ##订单状态  1-等待付款  2-等待发货 3-运输中  4-已签收  5-已取消
	orderTime BIGINT,            #下单时间
	payTime  BIGINT,             #付款时间
	deliverTime  BIGINT,         #发货时间
	receivedTime BIGINT          #签收时间
);

/**用户订单详情表**/
CREATE TABLE sp_order_detail(
	did INT PRIMARY KEY AUTO_INCREMENT,
	orderId INT,            #订单编号
	FOREIGN KEY(orderId) REFERENCES sp_order(aid),
	productId INT,          #产品编号
	count INT              #购买数量
);

/*首页商品*/
CREATE TABLE sp_index_product(
	pid INT(11) PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(64) DEFAULT NULL,
	subtitle VARCHAR(32) DEFAULT NULL,
	details VARCHAR(128) DEFAULT NULL,
  pic VARCHAR(128) DEFAULT NULL,
  price DECIMAL(10,2) DEFAULT NULL,
  href VARCHAR(128) DEFAULT NULL,
  seq_recommended TINYINT(4) DEFAULT NULL,
  seq_new_arrival TINYINT(4) DEFAULT NULL,
  seq_top_sale TINYINT(4) DEFAULT NULL
);

/*首页商品数据插入*/
INSERT INTO sp_index_product(pid,title,subtitle,details,pic,price,href,seq_recommended,seq_new_arrival,seq_top_sale) VALUES
(1, 'HUAWEI Mate 20系列','HUAWEI Mate 20系列', '6GB+64GB 全网通版（亮黑色）麒麟980新一代人工智能芯片，6.53英寸珍珠屏，超高屏占比，超微距影像，超大广角徕卡三摄旗舰手机', 'img/product/l2.png', '3999.00', 'product_details.html?lid=1', 1, 1, 1),
(2, 'HUAWEI P20系列', 'HUAWEI P20系列','6GB+64GB 全网通版（极光色）', 'img/product/l1.png', '3388.00', 'product_details.html?lid=2', 2, 2, 2),
(3, 'HUAWEI Mate 20系列','HUAWEI Mate 20系列', 'HUAWEI Mate 20 Pro (UD) 8GB+256GB 全网通版（宝石蓝）', 'img/product/l3.png', '6799.00', 'product_details.html?lid=3', 3, 3, 3),
(4, 'HUAWEI nova系列', 'HUAWEI nova系列','6.4英寸极点全面屏，4800万超广角三摄，2500万海报级自拍，AI微塑美颜，来电视频铃声，AI视频专家自动剪辑主角故事。', 'img/product/l4.jpg', '4966.00', 'product_details.html?lid=4', 4, 4, 4),
(5, 'HUAWEI WATCH','稀缺资源', 'GT 运动款 （黑色）高清大屏 强劲续航 健康管理', 'img/product/l6.png', '1238.00', 'product_details.html?lid=5', 5, 5, 5),
(6, 'HUAWEI MateBook','享3期免息', '全面屏轻薄性能本 皓月银 i5 8GB 512GB 独显 2K全面屏，HUAWEI Share 一碰传，快速充电持久续航，指纹式开机登录一键完成。', 'img/product/l5.png', '5699.00', 'product_details.html?lid=6', 6, 6, 6),
(7, '华为畅享9','32GB领券减50', '3GB+32GB 全网通标配版（极光蓝） 6.26英寸高清珍珠屏，4000mAh大电池', 'img/product/l7.png', '999.00', 'product_details.html?lid=7', 7, 7, 7);


/**商品类别表**/
CREATE TABLE sp_family(
	fid INT PRIMARY KEY AUTO_INCREMENT,
	fname VARCHAR(30)          #类别名称
);

/**手机商品表**/
CREATE TABLE sp_family_phone(
	lid INT PRIMARY KEY AUTO_INCREMENT,
	family_id INT,    #所属商品类别编号
	FOREIGN KEY(family_id) REFERENCES sp_family(fid),
	lname VARCHAR(30)
);


/**手机**/
CREATE TABLE sp_phone(
	pid INT(11) PRIMARY KEY AUTO_INCREMENT,
	family_id INT(11),						#所属型号家族编号
	#FOREIGN KEY(family_id) REFERENCES sp_family_phone(lid),
	title VARCHAR(50),				#主标题
	subtitle VARCHAR(50),			#副标题
	price DECIMAL(10,2),			#价格
	promise VARCHAR(70),			#服务承诺
	spec VARCHAR(70),					#规格
	color VARCHAR(20),				#颜色
	pname VARCHAR(32),			  #商品名称
	cpu VARCHAR(32),					  #处理器
	ram VARCHAR(32),			    #机身内存
	resolution VARCHAR(32),	  #分辨率
	details VARCHAR(1024),    #产品详细说明
	shelfTime VARCHAR(32),           #上架时间
  isOnsale BOOL DEFAULT 1,  #是否在售 
	sold_count INT(11)   #已出售数量
 );
INSERT INTO sp_phone(
	pid,family_id,title,subtitle,price,promise,spec,color,pname,cpu,ram,resolution,details,shelfTime,isOnsale,sold_count
)VALUES
(1,1,'HUAWEI Mate 20 6GB+64GB 全网通版（亮黑色）','麒麟980新一代人工智能芯片，6.53英寸珍珠屏，超高屏占比，超微距影像，超大广角徕卡三摄旗舰手机',3999.00,'已满48元已免运费  |  由华为商城负责发货，并提供售后服务','全网通 6GB+64GB','亮黑色','HUAWEI Mate 20系列','HUAWEI Kirin 980 （麒麟980）','64GB','FHD+ 2244x1080 像素','详细说明','2018-10',1,2980),
(2,1,'HUAWEI Mate 20 6GB+128GB 全网通版（亮黑色）','麒麟980新一代人工智能芯片，6.53英寸珍珠屏，超高屏占比，超微距影像，超大广角徕卡三摄旗舰手机',4499.00,'已满48元已免运费  |  由华为商城负责发货，并提供售后服务','全网通 6GB+128GB','亮黑色','HUAWEI Mate 20系列','HUAWEI Kirin 980 （麒麟980）','128GB','FHD+ 2244x1080 像素','详细说明','2018-10',1,1880),
(3,2,'HUAWEI P20 6GB+64GB 全网通版（樱粉金）','麒麟980新一代人工智能芯片，6.53英寸珍珠屏，超高屏占比，超微距影像，超大广角徕卡三摄旗舰手机',3999.00,'已满48元已免运费  |  由华为商城负责发货，并提供售后服务','全网通 6GB+128GB','樱粉金','HUAWEI Mate 20系列','HUAWEI Kirin 980 （麒麟980）','128GB','FHD+ 2244x1080 像素','详细说明','2018-10',1,2300),
(4,2,'HUAWEI P20 6GB+128GB 全网通版（樱粉金）','麒麟980新一代人工智能芯片，6.53英寸珍珠屏，超高屏占比，超微距影像，超大广角徕卡三摄旗舰手机',4499.00,'已满48元已免运费  |  由华为商城负责发货，并提供售后服务','全网通 6GB+128GB','樱粉金','HUAWEI Mate 20系列','HUAWEI Kirin 980 （麒麟980）','128GB','FHD+ 2244x1080 像素','详细说明','2018-10',1,2300),
(5,3,'HUAWEI P20 6GB+64GB 全网通版（宝石蓝）','麒麟980新一代人工智能芯片，6.53英寸珍珠屏，超高屏占比，超微距影像，超大广角徕卡三摄旗舰手机',3999.00,'已满48元已免运费  |  由华为商城负责发货，并提供售后服务','全网通 6GB+128GB','宝石蓝','HUAWEI Mate 20系列','HUAWEI Kirin 980 （麒麟980）','128GB','FHD+ 2244x1080 像素','详细说明','2018-10',1,2300),
(6,3,'HUAWEI P20 6GB+128GB 全网通版（宝石蓝）','麒麟980新一代人工智能芯片，6.53英寸珍珠屏，超高屏占比，超微距影像，超大广角徕卡三摄旗舰手机',4499.00,'已满48元已免运费  |  由华为商城负责发货，并提供售后服务','全网通 6GB+128GB','宝石蓝','HUAWEI Mate 20系列','HUAWEI Kirin 980 （麒麟980）','128GB','FHD+ 2244x1080 像素','详细说明','2018-10',1,2300),
(null,7,'HUAWEI P20 6GB+128GB 全网通版（蜜语红）','麒麟980新一代人工智能芯片，6.53英寸珍珠屏，超高屏占比，超微距影像，超大广角徕卡三摄旗舰手机',4499.00,'已满48元已免运费  |  由华为商城负责发货，并提供售后服务','全网通 6GB+128GB','蜜语红','HUAWEI Mate 20系列','HUAWEI Kirin 980 （麒麟980）','128GB','FHD+ 2244x1080 像素','详细说明','2018-10',1,2300);

/*手机产品图*/
CREATE  TABLE sp_phone_pic(
	pid INT(11) PRIMARY KEY AUTO_INCREMENT,
	family_id INT(11) DEFAULT NULL,
	sm VARCHAR(128) DEFAULT NULL,
	md VARCHAR(128) DEFAULT NULL,
	lg VARCHAR(128) DEFAULT NULL
);
INSERT INTO sp_phone_pic(pid,family_id,sm,md,lg) VALUES
(null,1,'img/product/sm/11.jpg','img/product/md/11.jpg','img/product/lg/11.jpg'),
(null,1,'img/product/sm/12.jpg','img/product/md/12.jpg','img/product/lg/12.jpg'),
(null,1,'img/product/sm/13.jpg','img/product/md/13.jpg','img/product/lg/13.jpg'),
(null,1,'img/product/sm/14.jpg','img/product/md/14.jpg','img/product/lg/14.jpg'),
(null,1,'img/product/sm/15.jpg','img/product/md/15.jpg','img/product/lg/15.jpg'),
(null,2,'img/product/sm/11.jpg','img/product/md/11.jpg','img/product/lg/11.jpg'),
(null,2,'img/product/sm/12.jpg','img/product/md/12.jpg','img/product/lg/12.jpg'),
(null,2,'img/product/sm/13.jpg','img/product/md/13.jpg','img/product/lg/13.jpg'),
(null,2,'img/product/sm/14.jpg','img/product/md/14.jpg','img/product/lg/14.jpg'),
(null,2,'img/product/sm/15.jpg','img/product/md/15.jpg','img/product/lg/15.jpg'),

(null,3,'img/product/sm/21.jpg','img/product/md/21.jpg','img/product/lg/21.jpg'),
(null,3,'img/product/sm/22.jpg','img/product/md/22.jpg','img/product/lg/22.jpg'),
(null,3,'img/product/sm/23.jpg','img/product/md/23.jpg','img/product/lg/23.jpg'),
(null,3,'img/product/sm/24.jpg','img/product/md/24.jpg','img/product/lg/24.jpg'),
(null,3,'img/product/sm/25.jpg','img/product/md/25.jpg','img/product/lg/25.jpg'),
(null,3,'img/product/sm/26.jpg','img/product/md/26.jpg','img/product/lg/26.jpg'),
(null,4,'img/product/sm/21.jpg','img/product/md/21.jpg','img/product/lg/21.jpg'),
(null,4,'img/product/sm/22.jpg','img/product/md/22.jpg','img/product/lg/22.jpg'),
(null,4,'img/product/sm/23.jpg','img/product/md/23.jpg','img/product/lg/23.jpg'),
(null,4,'img/product/sm/24.jpg','img/product/md/24.jpg','img/product/lg/24.jpg'),
(null,4,'img/product/sm/25.jpg','img/product/md/25.jpg','img/product/lg/25.jpg'),
(null,4,'img/product/sm/26.jpg','img/product/md/26.jpg','img/product/lg/26.jpg'),

(null,7,'img/product/sm/42.jpg','img/product/md/42.jpg','img/product/lg/42.jpg'),
(null,7,'img/product/sm/42.jpg','img/product/md/42.jpg','img/product/lg/42.jpg'),
(null,7,'img/product/sm/41.jpg','img/product/md/41.jpg','img/product/lg/41.jpg'),
(null,7,'img/product/sm/43.jpg','img/product/md/43.jpg','img/product/lg/43.jpg'),
(null,7,'img/product/sm/44.jpg','img/product/md/44.jpg','img/product/lg/44.jpg'),
(null,7,'img/product/sm/45.jpg','img/product/md/45.jpg','img/product/lg/45.jpg'),
(null,8,'img/product/sm/41.jpg','img/product/md/41.jpg','img/product/lg/41.jpg'),
(null,8,'img/product/sm/42.jpg','img/product/md/42.jpg','img/product/lg/42.jpg'),
(null,8,'img/product/sm/43.jpg','img/product/md/43.jpg','img/product/lg/43.jpg'),
(null,8,'img/product/sm/44.jpg','img/product/md/44.jpg','img/product/lg/44.jpg'),
(null,8,'img/product/sm/45.jpg','img/product/md/45.jpg','img/product/lg/45.jpg');





#创建购物车表
#货币误差 小数 1-0.99=0.100000000001
#price INT 要求精度高不允许
#1.99*100=199 单位分 200/100=2.00
CREATE TABLE sp_cart(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,
  pid INT,
  price DECIMAL(10,2) ,
  pname VARCHAR(255),
	img VARCHAR(128) DEFAULT NULL,
	count INT
);


/*商品分类表*/
CREATE TABLE sp_product(
	pid INT(11) PRIMARY KEY AUTO_INCREMENT,
	family_id INT(11) DEFAULT NULL,
	title VARCHAR(64) DEFAULT NULL,
  pic VARCHAR(128) DEFAULT NULL,
  price DECIMAL(10,2) DEFAULT NULL,
  href VARCHAR(128) DEFAULT NULL
);

/*首页商品数据插入*/
INSERT INTO sp_product(pid,family_id,title,pic,price,href) VALUES
(null, 1,'HUAWEI Mate 20系列','img/product/l2.png', '3999.00', 'product_details.html?lid=1'),
(null, 1,'HUAWEI P20系列','img/product/l1.png', '3388.00', 'product_details.html?lid=2'),
(null, 2,'HUAWEI Mate 20系列','img/product/l3.png', '6799.00', 'product_details.html?lid=3'),
(null, 3,'HUAWEI nova系列','img/product/l4.jpg', '4966.00', 'product_details.html?lid=4'),
(null, 1,'HUAWEI Mate 20系列','img/product/l2.png', '3999.00', 'product_details.html?lid=1'),
(null, 1,'HUAWEI P20系列','img/product/l1.png', '3388.00', 'product_details.html?lid=2'),
(null, 2,'HUAWEI Mate 20系列','img/product/l3.png', '6799.00', 'product_details.html?lid=3'),
(null, 3,'HUAWEI nova系列','img/product/l4.jpg', '4966.00', 'product_details.html?lid=4'),
(null, 1,'HUAWEI Mate 20系列','img/product/l2.png', '3999.00', 'product_details.html?lid=1'),
(null, 1,'HUAWEI P20系列','img/product/l1.png', '3388.00', 'product_details.html?lid=2'),
(null, 2,'HUAWEI Mate 20系列','img/product/l3.png', '6799.00', 'product_details.html?lid=3'),
(null, 3,'HUAWEI nova系列','img/product/l4.jpg', '4966.00', 'product_details.html?lid=4'),
(null, 1,'HUAWEI Mate 20系列','img/product/l2.png', '3999.00', 'product_details.html?lid=1'),
(null, 1,'HUAWEI P20系列','img/product/l1.png', '3388.00', 'product_details.html?lid=2'),
(null, 2,'HUAWEI Mate 20系列','img/product/l3.png', '6799.00', 'product_details.html?lid=3'),
(null, 3,'HUAWEI nova系列','img/product/l4.jpg', '4966.00', 'product_details.html?lid=4'),
(null, 1,'HUAWEI Mate 20系列','img/product/l2.png', '3999.00', 'product_details.html?lid=1'),
(null, 1,'HUAWEI P20系列','img/product/l1.png', '3388.00', 'product_details.html?lid=2'),
(null, 2,'HUAWEI Mate 20系列','img/product/l3.png', '6799.00', 'product_details.html?lid=3'),
(null, 3,'HUAWEI nova系列','img/product/l4.jpg', '4966.00', 'product_details.html?lid=4'),
(null, 1,'HUAWEI Mate 20系列','img/product/l2.png', '3999.00', 'product_details.html?lid=1'),
(null, 1,'HUAWEI P20系列','img/product/l1.png', '3388.00', 'product_details.html?lid=2'),
(null, 2,'HUAWEI Mate 20系列','img/product/l3.png', '6799.00', 'product_details.html?lid=3'),
(null, 3,'HUAWEI nova系列','img/product/l4.jpg', '4966.00', 'product_details.html?lid=4');






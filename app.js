var express=require('express');
var bodyParser=require("body-parser");
var app=express();
var request=require("request");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
	res.render("home.ejs");
});
app.use(express.static(__dirname + '/public'));
var sign,name,horoscope;
var info={};

app.get("/lucky",function(req,res,next){
	var id="http://ohmanda.com/api/horoscope/"+sign;
	if(sign){
		request(id ,function(err,respo,body){
		if(!err && respo.statusCode==200)
			{
				var data=JSON.parse(body);
				//console.log(data["horoscope"]);
				horoscope=data["horoscope"];
				// Now it contains the horoscope...
				next();

				
 			}
 		});
	}
	else
		res.redirect("/");
	
	
},function(req,res,next){
	id="https://zodiacal.herokuapp.com/"+sign;
	if(sign){
		request(id ,function(err,respo,body){
		if(!err && respo.statusCode==200)
			{
				var data=JSON.parse(body);
				info=data;
				// Now it contains the horoscope...
				next();

				
 			}
 		});
	}
	else
		res.redirect("/");
	
},function (req,res) {
	//console.log(info);
	res.render("dest.ejs",{
 				sign:sign,
 				name:name,
 				horoscope:horoscope,
 				info:info
 				});
	
});
	
	// else{
	// 	res.redirect("/");
	// }
app.get("*",function(req,res){
	res.send("ERROR 404- Page not found!!! LOL");
})
 app.post("/",function(req,res){
 	var date=req.body.date,flag=1;
 	var month=date.substring(5,7);
 	var date=date.substring(8,10);
 	var m=Number(month),
 		d=Number(date);
 	sign='';
 	if((m==3 && d>=21) || (m==4 && d<=19))
 		sign="aries";
 	if((m==4 && d>=20) || (m==5 && d<=20))
 		sign="taurus";
 	if((m==5 && d>=21) || (m==6 && d<=20))
 		sign="gemini";
 	if((m==6 && d>=21) || (m==7 && d<=22))
 		sign="cancer";
 	if((m==7 && d>=23) || (m==8 && d<=22))
 		sign="leo";
 	if((m==8 && d>=23) || (m==9 && d<=22))
 		sign="virgo";
 	if((m==9 && d>=23) || (m==10 && d<=22))
 		sign="libra";
 	if((m==10 && d>=23) || (m==11 && d<=21))
 		sign="scorpio";
 	if((m==11 && d>=22) || (m==12 && d<=21))
 		sign="sagittarius";
 	if((m==12 && d>=22) || (m==1 && d<=19))
 		sign="capricorn";
 	if((m==1 && d>=20) || (m==2 && d<=18))
 		sign="aquarius";
 	if((m==2 && d>=19) || (m==3 && d<=20))
 		sign="pisces";
 	name=req.body.name;
 	
 		res.redirect("/lucky");

 	
 })


app.listen(3000,function(){
	console.log("Connected to port 3000");
});
var Interface = require("./interface.js")

function Impl(){
	this.x=5;
	this.y=10;
}

var Iface = Interface(function(){
	this.x =5;
});

var a = new Impl();
var b = Iface(a);

console.log(b.x);
console.log(b.y);
try{
	var b = Iface({});
}catch(e){
	console.log("Breach of contract prevented!");
}
var Interface = require("./interface.js")
var assert = require("assert");
function Impl(){
	this.x=5;
	this.y=10;
};
var Iface = Interface(function(){
	this.x =5;
});
var a = new Impl();
var b = Iface(a);

console.log(b,a)
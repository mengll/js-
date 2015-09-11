
function a(b) {
   alert(b);
   b = function (){
        alert (b);
   }
   
   b();
}

a(1);

词法分析过程:
0: AO = {}
1: 分析参数 AO = {b:undefined} --> {b:1}
2: 分析var声明,没有.
3: 分析函数声明??  没有!

(注: b = function() {} ,是一个赋值过程,在执行期才有用)


执行过程:
alert(b); // 1
b = function() {
    alert(b);
}
b();  // function

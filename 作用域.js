1.js的作用的查找，首先是从函数的内部，不断的向外查找，直到查找到全局的window对象
var c = 5;

function t1() {
    var d = 6;

    function t2() {
        var e = 7;

        // var d = 3;  注释再去掉注释,观察结果的变化

        alert(c + d +e);
    }

    t2();
}

t1(); // 15, 18

/*
注意:
以window.xxx引用全局变量,寻找不到,做为某个属性不存在,返回undefined
直接以xxx引用某命题,寻找不到,则是报xxx is not defined错误
*/


/*
语法分析,

分析3样东西

第1步: 先分析参数
第2步: 再分析变量声明
第3步: 分析函数声明

一个函数能使用的局部变量,就从上面的3步分析而来


具体步骤:

0: 函数运行前的1瞬间, 生成 Active Object (活动对象),下称AO
1: 
   1.1 函数声明的参数,形成AO的属性,值全是undefined,
   1.2 接收实参,形成AO相应的属性的值

2: 分析变量声明声明声明! 如 var age, 
   如果AO上还没有age属性,则添加AO属性,值是undefined
   如果AO上已经有age属性,则不做任何影响
   

3: 分析函数声明,如 function foo() {}, 
则把函数赋给AO.foo属性
注: 如果此前foo属性已存在,则被无情的覆盖了
*/



function t(age) {
    alert(age);
}

t(5); // 5
t();//   undefined
/*
词法分析过程:
AO {age:undefined}

运行过程:
t(5)--> AO.age=5; alert(AO.age); //5

t() ---> AO.age没得到赋值, 还是undefined
*/



function t2(age) {
    var age = 99;
    alert(age);
}

t2(5); 
/*
分析过程:

0: 形成AO = {}
1: 
   1.1 分析形参 AO = {age:undefined}
   1.2 接收形参 AO = {age:5}

2: 分析var age, 发现AO已有age属性,不做任何影响


执行过程:
AO.age = 99;
alert(age);
*/



function t3(greet) {
    var greet = 'hello'; // 试着把这一句变成 var greet;再做分析
    alert(greet);

    function greet() {
    }

    alert(greet);
}

t3(null);  // hello hello

/*
词法分析过程:
0: AO = {}
1: 
   1.1 分析参数 AO = {greet:undefined}
   1.2 分析参数 AO = {greet:null}
2: 分析greet变量声明,AO已经有greet属性,因此不做任何影响
3: 分析greet函数声明, AO.greet = function() {} , 被覆盖成函数


执行过程:
greet = 'hello';
alert(greet);
alert(greet);
*/

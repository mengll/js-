function run(){
    console.log("zhuansghi")
    return function(a:any){
        console.log("-----2")
    }
}

// 第二个装饰器
function zd(){
    console.log("This is The function two");
    return function(constructor:any){
        console.log("----->3");
        constructor.prototype.getname = ()=>{
            console.log("Thisis func");
        }
    }
}

// 创建新的构造函数
function H<T extends new(...args:any[])=>any> (construct:T){
   return class extends construct {
       name ="pada";
   }
}

@H
class Good{
  name =""
  constructor(name:string){
    console.log(1);
    this.name =name;
    console.log(2);
  }
}

const d = new Good("ad");

// npm init -y
// tsc --init 
// npm install ts-node -D
// npm install typescript --save
//  "dev" : "ts-node ./src/one.ts"
// 执行 npm run dev

// 装饰器的注册是从上而下的注册，执行的时候是从下向上的执行 装饰器的 装饰器的执行过

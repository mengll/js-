// 函数装饰器
function g() {
    console.log("g(): evaluated");
    return function (
      target:any, // 对象类的 prototype 函数在定义 静态方法的是对应的构造函数
      propertyKey: string, // 装饰的函数的名称
      descriptor: PropertyDescriptor  // 控制函数的的
    ) {
      console.log("g(): called");
      console.log(target);
      console.log(propertyKey);
      console.log(descriptor); // 打印装饰函数的调用的内容 原址将变化的实现
      // value 就是原始的装饰的方法
      descriptor.value = function(){
          console.log("呵呵你天真了吧");
      }
    };
  }

 class Good {
    name :string ;
    constructor(){
        this.name = "锦标赛"
    }
    @g()
    run(){
        console.log("Hi this")
    }
 }
 
 let c = new Good();
 c.run();

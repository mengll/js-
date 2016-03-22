/**
 * Created by menglingliang on 2016/3/22. 1633094010@qq.com
 * this is a library for webgl
 */

var webgl = function(){
    "use strict";
    /*
      description 当前的操作是初始化一个着色器
      webl 当前的webgl对象
      vertexShaderSource 顶点着色器的源
      fragmentShaderSource 片元着色器的片元的数据
     */
    this.initShader(webgl,vertexShaderSource,fragmentShaderSource)
    {
        // 创建顶点着色器的实现，创建片元着色器的
        var vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
        if(vertexShader){
            console.log("create Shader is ok!");
        }
        // 创建新的shader 对象
        var fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
        //数据绑定
        webgl.shaderSource(vertexShader,vertexShaderSource);
        webgl.shaderSource(fragmentShader,fragmentShaderSource);
        //编译当前的shader
        webgl.compileShader(vertexShader);
        webgl.compileShader(fragmentShader);

        //检查当前的编译的信息
        if (!webgl.getShaderParameter(vertexShader, webgl.COMPILE_STATUS))
        {
            alert("error:vertexShader compile");
            return;
        }
        if (!webgl.getShaderParameter(fragmentShader, webgl.COMPILE_STATUS))
        {
            alert("error:fragmentShader compile");
            return;
        }
        //创建程序
        var program = webgl.createProgram();
        webgl.attachShader(program,vertexShader);
        webgl.attachShader(program,fragmentShader);

        webgl.linkProgram(program);

        if (!webgl.getProgramParameter(program, webgl.LINK_STATUS))
        {
            alert("error:program link error!");
            return;
        }

        webgl.useProgram(program);
        return program; //返回当前创建的程序
    }

    /*
       创建初始化的 webgl
       @name canvas 的ID
     */
    this.init(name)
    {
        var canvas = document.getElementById(name);
        return canvas.getContext("webgl")||this.canvas.getContext('experimental-webgl');
    }

//webgl end
};


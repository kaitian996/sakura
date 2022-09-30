# sakura

一个node后端框架  
具有IOC控制反转、DI依赖注入等特性  
提供多种装饰器 如：
```javascript
Get, Post, Patch, Put, Delete, Options, Head, All  //路由方法装饰器
Query, Body, Headers  //参数装饰器
Controller, Provider, Inject  //IOC装饰器
```
## Quick start

### Install
```shell
npm i sakuraframework
```
or if you'd like to use yarn
```shell
yarn add sakuraframework
```

## Demo
```shell
# 目录结构
src
|-Controller.ts #controller层
|-Service.ts #service层
|-main.ts #启动项目
```
### controller层

```js
// Controller.ts

import { Get, Post, Controller, Inject, Query } from 'sakuraframework'
import { adminService } from './Service'

@Controller('/admin') //根路由
export class Admin {
    // 依赖注入
    @Inject()
    public service: adminService;
    
    // get请求
    @Get('/name') //子路由
    getName(@Query('name') name: string, @Body('age') age: number,@Headers('who') who: string) { // 获取query中的name参数 ，获取body中的age参数， 获取header里的who参数
        console.log('getName');
        return { name, age,who }
    }
    
    // post请求
    @Post('/postName')
    postName(@Body('name') name: string) { // 获取body中的name参数
        console.log('postName');
        return name
    }
}
```
目前提供了 `Get, Post, Patch, Put, Delete, Options, Head, All`等请求方法
### service层
```js
// Service.ts
import {Provider} from 'sakuraframework';

//提供依赖
@Provider()
export class adminService {
    run() {
        console.log('car is running!');
    }
}
```

### 启动项目

```js
// main.ts
import { sakuraAppcation } from 'sakuraframework' //启动类

//导入controller层
import './controller'
new sakuraAppcation(8080).run() //设置端口
//sakuraAppcation(port:number,options:{cors:boolean;}={cors:true}) //设置端口，或设置跨域，默认开启跨域
```
```shell
tsc #编译ts
npm run main.js
```
##### 输出
```shell
sakuraAppcation is running!
running at 127.0.0.1:{your port}
```
即可访问接口：127.0.0.1:{your port}/admin/name?name=lili
```js
响应结果：lili
```

## 特性

### 依赖注入
```js
import {Provider} from 'sakuraframework';

//提供依赖
@Provider()
export class adminService {
    run() {
        console.log('car is running!');
    }
}
@Controller('/')
class controller{
    // 依赖注入
    @Inject()
    public service: adminService;
}

```
通过` @Provider()`提供依赖 ,通过 ` @Inject()` 即可注入依赖 

### 路由

```js
import { Get, Post, Controller, Inject, Query } from 'sakuraframework'

@Controller('/') //根路由，最终访问路径为根路由加上子路由
export class Admin {

    // get请求
    @Get('/name')  //子路由
    getName() { 
        console.log('getName');
        return 
    }
    
    // post请求
    @Post('/postName')
    postName() {
        console.log('postName');
        return 
    }
}
```

### 参数获取

```js
@Controller('/')
export class Admin {

    // get请求
    @Get('/name') 
    getName(@Query('name') name: string, @Body('age') age: number,@Headers('who') who: string) { // 获取query中的name参数 ，获取body中的age参数， 获取header里的who参数
        console.log('getName');
        return { name, age,who }
    }
    
    // post请求
    @Post('/postName')
    postName(@Body() name: Obejct) { // 参数装饰器不传入参数时，默认将全部参数获取为一个对象如 {name:"lili",age:18}
        console.log('postName');
        return name
    }
}
```
目前提供了`@Query()`,`@Body()`,`@Headers()` 来分别获取query、body、header参数

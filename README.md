# sakura

基于express的node框架  
具有IOC控制反转、DI依赖注入等特性  
提供多种装饰器 如：
```javascript
Get, Post, Controller, Query, Provider, Inject ,Body,Headers
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

@Controller('/')
export class Admin {
    // 依赖注入
    @Inject()
    public service: adminService;
    
    // get请求
    @Get('/name') 
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
```
```shell
tsc #编译ts
npm run main.js
```
##### 输出
```shell
sakuraAppcation is running!
```
即可访问接口：127.0.0.1:8080/name?name=111

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

@Controller('/') //一级路由，目前框架为使用到此路由，默认填'/'即可，后续更新会使用此参数
export class Admin {

    // get请求
    @Get('/name') 
    getName() { 
        console.log('getName');
        return }
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
    postName(@Body('name') name: string) { // 获取body中的name参数
        console.log('postName');
        return name
    }
}
```
目前提供了`@Query()`,`@Body('age')`,`@Headers()` 来分别获取query、body、header参
# vuex-micro-frontends

![NPM](https://img.shields.io/npm/l/vuex-micro-frontends)
![npm](https://img.shields.io/npm/v/vuex-micro-frontends)
![npm bundle size](https://img.shields.io/bundlephobia/min/vuex-micro-frontends)
![David](https://img.shields.io/david/dev/dream2023/vuex-micro-frontends)
![npm](https://img.shields.io/npm/dt/vuex-micro-frontends)

微前端 vuex 父子通信解决方案. vue micro frontends communication solution.

## 介绍

我们知道微前端父子通信方式有很多, 例如 `location`、`Cookie`、`LocalStorage`、`window`, 但是他们都有一个通病, 即无法实时监测变化, 例如换肤或者多语言切换, 想要应用到子项目, 必须进行页面的刷新, 然后才能通知到, 而尽量少的改动原项目的原则, 很多`Vue`项目都是基于`vuex`进行全局数据的共享, 所以才诞生了`vuex-micro-frontends`

## 特点

- 父子传递、实时变化
- 仅 1kb

## Installation

```bash
yarn add vuex-micro-frontends # npm install vuex-micro-frontends
```

## Usage

```js
// master, send state data 主应用, 负责发送数据
import vuexMicroFrontends from "vuex-micro-frontends";

const store = new Vuex.Store({
  state: {
    name: "jack",
    age: 10,
    gender: "men"
  },
  plugins: [vuexMicroFrontends.send()] // 默认下发全部数据
  // plugins: [vuexMicroFrontends.send(['name', 'age'])] // 仅向子应用下发 name 和 age 数据
});
```

```js
// slave, receive master state 子应用, 负责接受数据
import vuexMicroFrontends from "vuex-micro-frontends";

const store = new Vuex.Store({
  state: {
    name: "",
    age: null,
    address: ""
  },
  plugins: [vuexMicroFrontends.receive()] // 默认接受全部父组件传递的数据
  // plugins: [vuexMicroFrontends.receive(['name'])], // 仅接受 name 字段数据
});
```

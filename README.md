# vuex-micro-frontends

微前端 vuex 父子通信解决方案. vue micro frontends communication solution.

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

## 其它

对于框架应用和子应用，运行时都共享了当前页面的 `location`、`Cookie`、`LocalStorage`、`window` 等全局信息，因此应用间的通信，也可以通过这些方案很简单的实现。

import Vue from "vue";
import Vuex from "vuex";
import { pick, send, receive } from "./src/index";

Vue.config.productionTip = false;
Vue.use(Vuex);

it("pick function", () => {
  const obj = { name: "zhang", age: 10 };

  // 不传参数情况
  expect(pick(obj)).toStrictEqual({ name: "zhang", age: 10 });
  // 传参数的情况
  expect(pick(obj, ["name"])).toStrictEqual({ name: "zhang" });
});

it("send & receive without keys", done => {
  const masterStore = new Vuex.Store({
    state: { name: "zhang", age: 10 },
    mutations: {
      updateAge(state) {
        state.age += 1;
      }
    },
    plugins: [send()]
  });

  masterStore.commit("updateAge");

  setTimeout(() => {
    const slaveStore = new Vuex.Store({
      state: {
        age: null,
        name: ""
      },
      plugins: [receive()]
    });
    expect(slaveStore.state.name).toBe("zhang");
    expect(slaveStore.state.age).toBe(11);
    done();
  });
});

it("send & receive with keys", done => {
  const masterStore = new Vuex.Store({
    state: { name: "zhang", age: 10, sex: "man" },
    mutations: {
      updateAge(state) {
        state.age += 1;
      }
    },
    plugins: [send(["name", "sex"])]
  });

  masterStore.commit("updateAge");

  setTimeout(() => {
    const slaveStore = new Vuex.Store({
      state: {
        age: null,
        name: "",
        sex: ""
      },
      plugins: [receive(["name"])]
    });
    expect(slaveStore.state.name).toBe("zhang");
    expect(slaveStore.state.age).toBe(null);
    expect(slaveStore.state.sex).toBe("");
    done();
  });
});

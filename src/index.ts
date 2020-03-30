import { Plugin } from "vuex";
import { store as iceStore } from "@ice/stark-data";

const VUEX_DATA_KEY: string = "vuex";

interface AnyObj {
  [index: string]: any;
}

// 捡取数据
export function pick(obj: AnyObj, keys?: string[]) {
  // 如果keys未传递, 则直接返回 obj
  if (!keys) return obj;

  // 如果传递, 则进行挑选
  return Object.keys(obj).reduce((acc: AnyObj, key) => {
    if (keys.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

// 触发数据改变
export function send(keys?: string[]): Plugin<AnyObj> {
  return store => {
    store.subscribe((mutation, state) => {
      iceStore.set(VUEX_DATA_KEY, pick(state, keys));
    });
  };
}

// 监听数据改变
export function receive(keys?: string[]): Plugin<AnyObj> {
  return store => {
    // 监听变化, 设置数据
    iceStore.on(
      VUEX_DATA_KEY,
      (data: AnyObj) => {
        data = pick(data, keys);
        Object.keys(data).forEach((key: string) => {
          store.state[key] = data[key];
        });
      },
      true
    );
  };
}

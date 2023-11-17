import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import createPersistedState from 'vuex-persistedstate'

export interface User {
  username: string
  password: string
  email: string
  bio: string
  image: string
  token: string
}

export interface State {
  isCollapse: boolean
  user: User
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol('store')

// 创建一个新的 store 实例
export const store = createStore<State>({
  state () {
    return {
      isCollapse: false,
      user: {
        username: '',
        password: '',
        email: '',
        bio: '',
        image: '',
        token: '',
      }
    }
  },
  mutations: {
    toggleCollapse (state, payload) {
      state.isCollapse = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
  },
  plugins: [createPersistedState()]
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}
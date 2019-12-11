// store/user/index.ts

import { Module } from 'vuex'
import { UserState } from './types'
import { RootState } from '../types'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'

const state: UserState = {
  firstName: '',
  lastName: '',
  mobile: '',
  token: '',
  phone: '',
  deviceId: ''
}
const namespaced = true
export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
export default state
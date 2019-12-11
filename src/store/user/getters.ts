// store/user/getters.ts

import { GetterTree } from 'vuex'
import { UserState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<UserState, RootState> = {
  fullName(state): string {
    return `${state.firstName} ${state.lastName}`
  },
  userData(state): any{
    return {
      token: state.token,
      phone: state.phone,
      deviceId: state.deviceId
    }
  }
}

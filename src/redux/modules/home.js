import { get } from '../../utils/request'
import url from '../../utils/url'
import { FETCH_DATA } from '../middleware/api'
import { schema } from './entities/products'

export const types = {
  FETCH_LIKES_REQUEST: "HOME/FETCH_LIKES_REQUEST", // 获取猜你喜欢请求
  FETCH_LIKES_SUCCESS: "HOME/FETCH_LIKES_REQUEST", // 获取猜你喜欢请求
  FETCH_LIKES_FAILURE: "HOME/FETCH_LIKES_REQUEST", // 获取猜你喜欢请求
}

const fetchLikes = (endPoint, params) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_LIKES_REQUEST,
      types.FETCH_LIKES_SUCCESS,
      types.FETCH_LIKES_FAILURE
    ],
    endPoint,
    schema
  },
  params,
})

export const actions = {
    loadLikes: () => {
      return (dispatch, getState) => {
        const endPoint = url.getProductList(0, 10)
        return dispatch(fetchLikes(endPoint))
      }
    }
}

const reducer = (state = {}, action) => {
  switch(action.type) {
    case types.FETCH_LIKES_REQUEST:
    //
    case types.FETCH_LIKES_SUCCESS:
    //
    case types.FETCH_LIKES_FAILURE:
    //
    default:
      return state
  }
  return state;
}

export default reducer
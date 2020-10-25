import { get } from '../../utils/request'
export const FETCH_DATA = 'FETCH DATA';

export default store => next => action => {
  const callAPI = action[FETCH_DATA]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const {endPoint, schema, types} = callAPI;
  if (typeof endPoint !== 'string') {
    throw new Error('必须指定endpoint为url类型')
  }
  if (!schema) {
    throw new Error('必须指定领域实体的schema')
  }
  if (!Array.isArray(types) && types.length !== 3) {
    throw new Error('需要指定一个包含3个action 的数组');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('action type 必须为字符串类型')
  }

  const actionWith = data => {
    const finalAction = {...action, ...data}
    delete finalAction[FETCH_DATA]
    return finalAction
  }

  const [requestType, successType, failureType] = types

  next(actionWith({ type: requestType }))


  return fetchData(endPoint, schema).then(
    res => next(actionWith({ type: successType, res })),
    err => next(actionWith({
        type: failureType,
        err: err.message || '获取数据失败'
      }))
  )
}

const fetchData = (endPoint, schema) => {
  return get(endPoint).then(data => {
    return normalizeData(data, schema)
  })
}

// 扁平化处理
const normalizeData = (data, schema) => {
  const { id, name } = schema
  let kvObj = {};
  let ids = [];
  if (Array.isArray(data)) {
    data.forEach(item => {
      kvObj[item[id]] = item;
      ids.push(item[id])
    })
  }
  else {
    kvObj[data[id]] = data;
    ids.push(data[id])
  }
  return {
    [name]: kvObj,
    ids
  }
}
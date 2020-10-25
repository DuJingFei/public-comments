export const schema = {
  name: 'products',
  id: 'id'
}

const reducer = (state = {}, action) => {
  if (action.res && action.res.products) {
    return {...state, ...action.res.products}
  }
  return state;
}
  
export default reducer;
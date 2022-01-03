export const user = (state) => {
  return {
    isLogin: state.account.length > 0,
    isAdmin: state.role === 1,
    ...state
  }
}

const getters = {
  app_token: state => state.app.token,
  app_tokenType: state => state.app.tokenType,
  app_openid: state => state.app.openid,
  callback_url: state => state.callback.url
}
export default getters

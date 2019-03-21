// import Cookies from 'js-cookie'
export default function({ isClient, isServer, store, req, route, error, redirect }) {
  if (isServer) {
    if (route.path !== '/login') {
      redirect('/')
    }
  }
  // 在客户端判读是否需要登陆
  if (isClient) {
    console.log('isClient..............')
  }
}


// import Cookies from 'js-cookie'
export default function({ store, req, route, error, redirect }) {
  const isClient = process.client
  const isServer = process.server
  if (isServer) {
    console.log('isServer')
  }
  if (isClient) {
    if (!store.state.user.token) {
      redirect(`/`)
    }
  }
}


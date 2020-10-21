// import Cookies from 'js-cookie'
export default function({ store, req, route, error, redirect }) {
  const isClient = process.client
  const isServer = process.server
  if (isServer) {
    console.log('isServer')
  }
  if (isClient) {
    console.log('isClient')
  }
  if (!store.state.user.data.avatar) {
    redirect(`/`)
  }
}


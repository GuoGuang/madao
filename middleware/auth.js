// import Cookies from 'js-cookie'
export default function({ isClient, isServer, store, req, route, error, redirect }) {
  if (!store.state.user.token) {
    return redirect(`/`)
  }
}


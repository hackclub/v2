const serviceWorkerKiller = () => {
  /*
  NOTE(max@maxwofford.com) For a few months we used the Gatsby Offline plugin (https://www.gatsbyjs.org/packages/gatsby-plugin-offline/), which registered a service workers on browser clients.
  After removing it we found clients with registered service workers had caching problems that were solved by unregistering the outdated service worker.
  */
  const sw_supported = navigator && navigator.serviceWorker

  if (sw_supported) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      if (registrations.length > 0) {
        console.log('Unregistering service workers')
      } else {
        console.log('No service workers found')
      }
      for (let registration of registrations) {
        registration.unregister()
      }
    })
  }
}

export default serviceWorkerKiller

;(function() {
  /*
  NOTE(max@maxwofford.com):
  For a few months we used the Gatsby Offline plugin (https://www.gatsbyjs.org/packages/gatsby-plugin-offline/), which registered a service workers on browser clients.
  After removing it we found clients with registered service workers had caching problems that were solved by unregistering the outdated service worker.
  */

  if (typeof window !== 'object') return null
  if (window.swkillerRun) return null

  var sw_supported = navigator && navigator.serviceWorker

  if (sw_supported) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      if (registrations.length > 0) {
        console.log('Unregistering service workers')

        for (let registration of registrations) {
          registration.unregister()
        }
        window.swkillerRun = true
        window.location.reload()
      } else {
        console.log('No service workers found')
      }
    })
  }
})()

const check = () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('No Service Worker support!')
	  console.log("uh oh")
  }
  if (!('PushManager' in window)) {
    throw new Error('No Push API Support!')
	  console.log("uh oh")
  }
}

const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register('service.js')
	console.log("hello!");
		//.then(function(){
			//console.log("Registered!")
		//})
		//.catch(function(error){
			//console.log("Failed!")
		//})
  return swRegistration
}

const requestNotificationPermission = async () => {
	console.log("nijk")
  const permission = await window.Notification.requestPermission()
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  if (permission !== 'granted') {
    throw new Error('Permission not granted for Notification')
  }
}

async function register() {
	console.log("brolo")
  await check()
  const swRegistration = await registerServiceWorker()
  localStorage.setItem("subscription", swRegistration)
  await requestNotificationPermission()
}

module.exports = {"register": register};

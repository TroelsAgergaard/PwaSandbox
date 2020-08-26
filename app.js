if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('/sw.js').then(
			function(registration) {
				// Registration was successful
				console.log('ServiceWorker registration successful with scope: ', registration.scope);
			},
			function(err) {
				// registration failed :(
				console.log('ServiceWorker registration failed: ', err);
			}
		);
	});
}

Notification.requestPermission(function(status) {
	console.log('Notification permission status:', status);
});

function displayNotification() {
	if (Notification.permission == 'granted') {
		navigator.serviceWorker.getRegistration().then(function(reg) {
			var options = {
				body: 'Here is a notification body!',
				icon: 'img/marioios.png',
				vibrate: [ 100, 50, 100 ],
				data: {
					dateOfArrival: Date.now(),
					primaryKey: 1
				},
				actions: [
					{
						action: 'explore',
						title: 'Explore this new world',
						icon: 'img/marioios.png'
					},
					{
						action: 'close',
						title: 'Close notification',
						icon: 'img/marioios.png'
					}
				]
			};
			reg.showNotification('Hello World!', options);
		});
	}
}

displayNotification();

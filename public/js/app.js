if( 'serviceWorker' in navigator) {
  window.addEventListener('load', event => {
    navigator.serviceWorker
      .register('sw.js')
      .then(reg => console.log("Service worker has been registred with success ", reg))
      .catch(err => console.log(err.message));
  })
}
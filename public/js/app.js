if( 'serviceWorker' in navigator) {
  window.addEventListener('load', event => {
    // register a serviceWorker
    navigator.serviceWorker
      .register('sw.js')
      .then(reg => console.log("Service worker has been registred with success ", reg))
      .catch(err => console.log(err.message));
  
    });
    // other UI stuff
    getCurrentTimesOfPraies();
}

async function getCurrentTimesOfPraies(locationName = 'setif') {
  const $list = document.querySelector('#list');
  const data = await fetch(`https://api.pray.zone/v2/times/today.json?city=${locationName}`);
  const response = await data.json();
  const { code, results } = response;
  if( code === 200 ) {
    console.log(response);
    results.datetime.forEach(({times, date}) => {
      const { Fajr, Asr, Dhuhr, Imsak, Isha, Maghrib } = times;
      const render = `
        <li>State: <b>${locationName.toUpperCase()}</b> on <mark>${date.hijri} hijri</mark></li>
        <li>Fajr: ${Fajr}</li>
        <li>Imsak: ${Imsak}</li>
        <li>Dhuhr: ${Dhuhr}</li>
        <li>Asr: ${Asr}</li>
        <li>Maghrib: ${Maghrib}</li>
        <li>Isha: ${Isha}</li>
      `;
      $list.innerHTML += render;
    })
  }
}
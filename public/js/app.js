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

const getTheNextPrayTime = (date, timeOfCurrentPray) => {
  let dateTimestamp = Date.now();
  let prayTimestamp = new Date(`date `);

  console.log("======>", timestamp);
}

async function getCurrentTimesOfPraies(locationName = 'setif') {
  const $list = document.querySelector('#list');
  const data = await fetch(`https://api.pray.zone/v2/times/today.json?city=${locationName}&school=8`);
  const response = await data.json();
  const { code, results } = response;
  if( code === 200 ) {
    //console.log(response);
    results.datetime.forEach(({times, date}) => {
      const { Fajr, Asr, Dhuhr, Imsak, Isha, Maghrib } = times;
      getTheNextPrayTime(date.gregorian)
      const render = `
        <li class='collection-item active green darken-3'>
          State: <b style='text-transform: capitalize'>${locationName}</b> 
          <span class="new badge green darken-4">${date.hijri} hijri</span>
        </li>
        <li class='collection-item'>Fajr: ${Fajr}</li>
        <li class='collection-item'>Imsak: ${Imsak}</li>
        <li class='collection-item'>Dhuhr: ${Dhuhr}</li>
        <li class='collection-item'>Asr: ${Asr}</li>
        <li class='collection-item'>Maghrib: ${Maghrib}</li>
        <li class='collection-item'>Isha: ${Isha}</li>
      `;
      $list.innerHTML += render;
    })
  } else $list.innerHTML += "<h4 class='red darken-3'>Something went wrong</h4>";

}
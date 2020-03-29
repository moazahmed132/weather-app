window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(".temperature-description");
  // console.log("temperatureDescription", temperatureDescription)
  let temperatureDegree = document.querySelector(".temperature-degree");
  // console.log("temperatureDegree", temperatureDegree)
  let locationTimezone = document.querySelector(".location-timezone");
  // console.log("locationTimezone", locationTimezone)
  let temperatureSection = document.querySelector(".degree-section");
  //console.log("temperatureSection", temperatureSection)
  const temperatureSpan = document.querySelector(".degree-section span");
  console.log("temperatureSpan", temperatureSpan)



  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      // console.log("long", long)
      lat = position.coords.latitude;
      // console.log("lat", lat);
      const proxy = "https://cors-anywhere.herokuapp.com/"
      const api = `${proxy}https://api.darksky.net/forecast/e9eec2706bfa4d70e6bf86506b7ff611/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json()
        })
        .then(data => {
          // console.log("data", data)
          const { temperature, summary, icon } = data.currently;

          // set dom from api
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          let celsius = (temperature - 32) * (5 / 9);
          setIcons(icon, document.querySelector(".icon"));

          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F"
              temperatureDegree.textContent = temperature;

            }
          })

        })
    });
  }
  function setIcons(icon, iconId) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }
});
// Needed variables
const IDs = ['area', 'country', 'temp', 'feels', 'max', 'min', 'hum', 'pres'];
let units = document.getElementById('units').value;
let m = Math.round;
let temps = [];

/**
 * Fetches weather data
 */
function getData() {

    let zip = document.getElementById('zip').value;
    let countrycode = document.getElementById('country_code').value;

    // Clean string
    zip = zip.trim();
    countrycode = countrycode.trim();
    countrycode = countrycode.toLowerCase();

    // Variables
    const api = 'c47f37ea41b53c65281601faf7db363b';
    const url = 'https://api.openweathermap.org/data/2.5/weather?';

    fetch(
        `${url}zip=${zip},${countrycode}&APPID=${api}`
    )
        .then(res => {
            return res.json();
        })
        .then(data => {
            // Save temperatures
            temps = [data.main.temp, data.main.feels_like, data.main.temp_max, data.main.temp_min];

            // Put data into DOM when successful
            document.getElementById(IDs[0]).innerHTML = data.name;
            document.getElementById(IDs[1]).innerHTML = data.sys.country;
            document.getElementById(IDs[6]).innerHTML = ''+m(data.main.humidity)+'%';
            document.getElementById(IDs[7]).innerHTML = ''+m((data.main.pressure/3386.39)*100)+' Hg';
            fillTemps();
        })
        .catch(err => {
            // Change values representing an error
            IDs.forEach(el => {
                document.getElementById(el).innerHTML = 'Error: see console';
            });
            // Clear temperatures
            temps = [];
            console.log(err);
        });
}


/**
 * Updates current temperature units when another unit is selected
 */
function updateUnits(){
    units = document.getElementById('units').value;
    if(temps.length != 0){
        fillTemps();
    }
}


/**
 * Fills table with temperatures, assumes the temps array is not empty
 */
function fillTemps(){
    let f;
    units == 'F'? f=x=>{return (x-273.15)*9/5+32;}:f=x=>{return x-273.15};
    document.getElementById(IDs[2]).innerHTML = ''+m(f(temps[0]))+' °'+units;
    document.getElementById(IDs[3]).innerHTML = ''+m(f(temps[1]))+' °'+units;
    document.getElementById(IDs[4]).innerHTML = ''+m(f(temps[2]))+' °'+units;
    document.getElementById(IDs[5]).innerHTML = ''+m(f(temps[3]))+' °'+units;
}
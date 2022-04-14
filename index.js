function getData(){

    let city=document.querySelector("#city").value
    
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ae37ca2ddb2a5b3b9373de7644dd8d08`

    fetch(url)
    .then(function(res){
        return res.json()
    })
    .then(function(res){
        append(res)
        console.log("res:",res)
    })
    .catch(function(err){
        console.log("wether:",err)
    })
    document.querySelector("#city").value=null
}

function append(data){
    
    let container=document.querySelector("#collect")
    let map=document.getElementById("gmap_canvas")
    container.innerHTML=null

    

    let city=document.createElement("p")
    city.innerText=`City: ${data.name}`

    let min=document.createElement("p")
    min.innerText=`min temp: ${Math.ceil(data.main.temp_min - 273.15)} \u00B0C`

    let max=document.createElement("p")
    max.innerText=`max temp: ${Math.ceil(data.main.temp_max - 273.15)} \u00B0C`

    let current=document.createElement("p")
    current.innerText=`current temp: ${Math.ceil(data.main.temp - 273.15)} \u00B0C`

    let humidity=document.createElement("p")
    humidity.innerText=`humidity: ${data.main.humidity} % `

    let risediv=document.createElement("div")
    risediv.setAttribute("class","sunrise")
    let sunrise=document.createElement("p")
    sunrise.innerText=`Sunrise: ${data.sys.sunrise}`
    const riseimg=document.createElement("img")
    riseimg.src="./sunrise.png"

    risediv.append(sunrise,riseimg)

    let setdiv=document.createElement("div")
    setdiv.setAttribute("class","sunrise")
    let sunset=document.createElement("p")
    sunset.innerText=`Sunset: ${data.sys.sunset}`
    const setimg=document.createElement("img")
    setimg.src="./sunset.png"

    setdiv.append(sunset,setimg)

    let wind=document.createElement("p")
    wind.innerText=`Wind: speed= ${data.wind.speed}km/h, deg= ${data.wind.deg}\u00B0, gust= ${data.wind.gust}`

    let cloud=document.createElement("p")
    cloud.innerText=`Clouds: ${data.clouds.all}`

    container.append(city,min,max,current,humidity,risediv,setdiv,wind,cloud)
    map.src=`https://maps.google.com/maps?q=${data.name}&t=&z=1&ie=UTF8&iwloc=&output=embed`;

    let lat=data.coord.lat
    let long=data.coord.lon

    getDataLocation(lat,long)
}


function getDataLocation(lat,lon){
    
    const url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=ae37ca2ddb2a5b3b9373de7644dd8d08`

    fetch(url)
    .then(function(res){
        return res.json()
    })
    .then(function(res){
        next7days(res)
        console.log("res:",res)
    })
    .catch(function(err){
        console.log("wether:",err)
    })
}

function next7days(data){
    document.querySelector("#next_days").innerHTML=null
    const days=["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    console.log(data.daily)

    for(let i=0;i<7;i++){
        let div=document.createElement("div")

        let day=document.createElement("h2")
        day.innerText=days[i]

        const sun=document.createElement("img")
        sun.setAttribute("class","sun")
        sun.src="./sun.png"

        let max=document.createElement("h2")
        max.innerText=`${Math.ceil(data.daily[i].temp.max- 273.15)} \u00B0C`

        let min=document.createElement("h2")
        min.innerText=`${Math.ceil(data.daily[i].temp.min- 273.15)} \u00B0C`

        div.append(day,sun,max,min)

        document.querySelector("#next_days").append(div)
    }


}
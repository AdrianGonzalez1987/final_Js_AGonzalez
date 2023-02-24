window.addEventListener('load', () => 
{   //geolocalizador, aplica con permiso de usuario
    let lon
    let lat
    let temperaturaValor = document.getElementById('temperaturaValor')
    let temperaturaDescripcion = document.getElementById('temperaturaDescripcion')
    let ubicacion = document.getElementById('ubicacion')
    let humedad = document.getElementById('humedad')
    let iconoAnimado = document.getElementById('iconoAnimado')
    let lahora = document.getElementById('lahora')
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition (posicion => 
        {
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude
            //ubicacion auto
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&APPID=bcdc974fe288f6a9e655c3fa3128722f`

            //ubicacion por ciudad
            //api.openweathermap.org/data/2.5/weather?q=BuenosAires&lang=es&units=metric&appid=bcdc974fe288f6a9e655c3fa3128722f
            
            //const url = 'https://api.openweathermap.org/data/2.5/weather?q=Argentina&lang=es&units=metric&dt=1677122579&APPID=bcdc974fe288f6a9e655c3fa3128722f'
            console.log(url)
            
            fetch(url)
            .then(response => {return response.json()})
            .then(data => 
            {
                     //console.log(data.main.temp)
                     //temperatura
                    let temp = Math.round(data.main.temp)
                    temperaturaValor.textContent = temp + '°C'
                    //descripcion del lugar
                    let dsc = data.weather[0].description
                    temperaturaDescripcion.textContent = dsc.toUpperCase()
                    //ubicacion
                    let ubi = data.name
                    ubicacion.textContent = ubi
                    //humedad
                    let hum = Math.round(data.main.humidity)
                    humedad.textContent = 'HUMEDAD ' + hum + '%';
                
                    //ICONO animado
                    console.log(data.dt)
                    let hora = data.dt
                    let date = new Date(hora)
                    lahora.textContent =  `${date}`
                    console.log(date)
                    switch (data.weather[0].main) //aca intercambio los iconos de la api por los que tengo en la carpeta animated comparandolos con el valor que guarda 
                    {
                        case 'Thunderstorm':
                            iconoAnimado.src='animated/thunder.svg'
                            console.log('TORMENTA');
                        break;
                        case 'Drizzle':
                            iconoAnimado.src='animated/rainy-2.svg'
                            console.log('LLOVIZNA');
                        break;
                        case 'Rain':
                            iconoAnimado.src='animated/rainy-7.svg'
                            console.log('LLUVIA');
                        break;
                        case 'Snow':
                            iconoAnimado.src='animated/snowy-6.svg'
                            console.log('NIEVE');
                        break;                        
                        case 'Clear':
                            iconoAnimado.src='animated/day.svg'
                            console.log('LIMPIO');
                        break;
                        case 'Atmosphere':
                            iconoAnimado.src='animated/weather.svg'
                            console.log('ATMOSFERA');
                            break;  
                        case 'Clouds':
                            iconoAnimado.src='animated/cloudy.svg'
                            console.log('NUBES');
                        break;  
                        default:
                            iconoAnimado.src='animated/cloudy-day-1.svg'
                            console.log('por defecto');
                    }
                
                //icono estaticos
                // let iconCode = data.weather[0].icon
                // const urlIcon  = `http://openweathermap.org/img/wn/${iconCode}@2x.png` //estos son los de la pagina
                // console.log(urlIcon)
                

            })
            .catch(error => {console.log(error)})//captura si hay algun error en la api y lo muestra en consola
        })
    }
})
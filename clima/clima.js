//Importaciones
const axios = require('axios');

//Constantes
const apiKey = 'ee9dc41ca3c4cbae53407834ed9b0bed';
const _url = `https://api.openweathermap.org/data/2.5/weather`;

//Funciones
const getLugarLatLng = async(direccion) => {

    const encodedURL = encodeURI(direccion);
    const instance = axios.create({
        baseURL: `${_url}?q=${encodedURL}&appid=${apiKey}`
    });

    const resp = await instance.get();

    if (resp.data.cod != 200) {
        throw new Error(`${color.red('Ha habido un error en la consulta de datos para la dirección')} ${color.yellow(direccion)}`);
    }

    const data = resp.data;
    const direction = data.name;
    const latitud = data.coord.lat;
    const longitud = data.coord.lon;

    return {
        direction,
        latitud,
        longitud
    }

}

const getClima = async(latitud, longitud, units = 'metric') => {
    const url = `${_url}?lat=${latitud}&lon=${longitud}&appid=${apiKey}&units=${units}`;
    const resp = await axios.get(url);

    const data = resp.data;

    let unidad = '';
    switch (units) {
        case 'metric':
            unidad = 'ºC';
            break;
        case 'standard':
            unidad = 'ºK';
            break;
        case 'imperial':
            unidad = 'ºF';
            break;
        default:
            unidad = 'No especificada';
    }

    const temperatura = data.main.temp;

    return {
        unidad,
        temperatura
    }
}


const getInfo = async(direccion) => {
    //Recogemos los parametros con la dirección
    let coordenadas = await getLugarLatLng(direccion);
    let parametros = await getClima(coordenadas.latitud, coordenadas.longitud, 'metric');

    let temperatura = parametros.temperatura;
    let unidad = parametros.unidad;
    return {
        direccion,
        unidad,
        temperatura
    }

}

module.exports = {
    getInfo
}
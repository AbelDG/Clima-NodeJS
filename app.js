const argv = require('yargs')
    .options({
        direction: {
            alias: 'd',
            desc: 'Dirección de la ciudad',
            demand: true
        }
    })
    .argv;

const color = require('colors/safe');
const clima = require('./clima/clima');

clima.getInfo(argv.direction)
    .then(resp => {
        console.log(`El clima de ${color.green(resp.direccion)} es de ${resp.temperatura}${resp.unidad}`);
    })
    .catch(error => console.log(`No se pudo determinar el clima de ${argv.direction}`))
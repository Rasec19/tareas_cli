require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInputs } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');



const main = async () => {

    let opt = ''
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if ( tareasDB ) {
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        
        opt = await inquirerMenu();
        
        switch(opt) {
            case '1':
                // crear opcion
                const desc = await leerInputs('Descripción:');
                tareas.crearTarea( desc );
            break;
            case '2':
                console.log( tareas.listadoArr )
            break;
        }

        guardarDB( tareas.listadoArr );

        await pausa();

    } while ( opt !== '0' )


}



main();
require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInputs, listadoTreasBorrar } = require('./helpers/inquirer');
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
            case '1': // crear tarea
                const desc = await leerInputs('Descripción:');
                tareas.crearTarea( desc );
            break;
            case '2': // Listar todas las tareas
                tareas.listadoCompleto();
            break;
            case '3': // Listar tareas compeltadas
                tareas.listarPendientesCompletadas(true);
            break;
            case '4': // Listar tareas pendientes
                tareas.listarPendientesCompletadas(false);
            break;
            case '6': // Borrar
                const id = await listadoTreasBorrar( tareas.listadoArr );
                console.log({id});
            break;
        }

        guardarDB( tareas.listadoArr );

        await pausa();

    } while ( opt !== '0' )


}



main();
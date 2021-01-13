const Proyectos = require('./../models/Proyectos');

exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
}

exports.formularioProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
}

exports.nuevoProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    // Enviar a la consola lo que el usuario escriba
    // console.log(req.body);

    // Validar que exista un valor en el input
    const { nombre } = req.body;

    let errores = [];

    if(!nombre) errores = [...errores, {'texto': 'Agregar un nombre al proyecto'}]

    // Si hay errores
    if(errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        });
    }
    else {
        // No hay errores
        // Insertar en la BD

        await Proyectos.create({ nombre })

        res.redirect('/nuevo-proyecto');
    }
}

exports.proyectoPorUrl = async (req, res, next) => {
    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    const [proyectos, proyecto] = await Promise.all([
        proyectosPromise,
        proyectoPromise
    ])

    if(!proyecto) return next();

    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyectos,
        proyecto
    });
}

exports.formularioEditar = async (req, res) => {
    const proyectosPromise = Proyectos.findAll();
    
    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id
        }
    });

    const [proyectos, proyecto] = await Promise.all([
        proyectosPromise,
        proyectoPromise
    ]);

    // Render a la vista
    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    });
}

exports.actualizarProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    // Validar que exista un valor en el input
    const { nombre } = req.body;

    let errores = [];

    if(!nombre) errores = [...errores, {'texto': 'Agregar un nombre al proyecto'}]

    // Si hay errores
    if(errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        });
    }
    else {
        // No hay errores
        // Insertar en la BD

        await Proyectos.update(
            { nombre },
            { where: { id: req.params.id }}
        );

        res.redirect('/nuevo-proyecto');
    }
}
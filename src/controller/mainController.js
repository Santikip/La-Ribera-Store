const path = require('node:path');
const data = require('../models/productos.json');
const personas = require('../models/personas.json');
const servicios = require('../models/servicios.json');
const usuarios = require('../models/usuarios.json');
const rutaUsuarios = path.join(__dirname, '../models/usuarios.json');

const fs = require('fs');
const { log } = require('node:console');

const leerUsuarios = () => {
    if (!fs.existsSync(rutaUsuarios)) return [];
    const contenido = fs.readFileSync(rutaUsuarios, 'utf-8') || '[]';
    try { 
        return JSON.parse(contenido); 
    } catch { 
        return [];
    }
}

const controller = {
    //Para mostrar archivos .ejs
    home: (req, res) => {
        res.render('home',{
            data: data,       // Productos desde productos.json
            servicios: servicios   // Servicios desde servicios.json
        });
    },
    servicios: (req, res) => {
        res.render('servicios', {servicios})
    },
    personas: (req, res) => {
        res.render('personas', {personas})
    },
    usuarios: (req, res) => {
        res.render('usuarios', {usuarios})
    },

    // Para mostrar el formulario
    form: (req, res) => {
        res.render('form')
    },
    //  Procesa los datos del formulario y los muestra en consola
    processform: (req, res) => {
        const { nombre, apellido, edad, email, password } = req.body;

        // formas para comprobar si estan llegand correctamente los datos
        // console.log('Datos recibidos del formulario: ', {nombre, apellido, edad, email });
        // res.json({message: 'Formulario recibido, gracias por registrarte', data: req.body});

        // res.send('Formulario recibido, gracias por registrarte');

        // 1. Crear un objeto con los datos del formulario
        const nuevoUsuario = {
            nombre,
            apellido,
            edad,
            email,
            password
        };

        // 2. Ruta absoluta del archivo JSON donde se van a guardar los usuarios
        const archivoUsuarios = path.join(__dirname, '../models/usuarios.json'); // Ruta en la que se indica donde tenemos nuestro archivo

        // 3. Leer el archivo JSON existente
        let usuarios = [];
        if (fs.existsSync(archivoUsuarios)) {
            const contenido = fs.readFileSync(archivoUsuarios, 'utf-8');
            try {  // try catch por si el archivo esta vacio o tiene errores. (igual a try except en ppython)
                usuarios = JSON.parse(contenido);     // Parseo el archivo para poder pasarlo a javaScript. Lo cambio para poder usarlo
            } catch (error) {
                console.error('Error parseando usuario.json:', error)
                usuarios = [];
            }
        }

        // 4. Agregar el nuevo usuario
        usuarios.push(nuevoUsuario); // Push añade el nuevo usuario al array de usuarios

        // 5. Guarda el array actualizado en usuarioS.json, sobreescribiendolo
        fs.writeFileSync(archivoUsuarios, JSON.stringify(usuarios, null, 2), 'utf-8');  // Parse de nuevo para poder pasarlo a JSON asi lo escribimos en el archivo

        console.log('Datos guardados correctamente: ', nuevoUsuario);
        // res.alert('Formulario recibido y usuario guardado correctamente en usuario.json!');
        //res.redirect('/');

        // Muestra en nuestro login un mensaje de que se ha guardado correctamente
        res.redirect('/?msg=guardado');
        
        //res.send('Formulario recibido y usuario guardado correctamente en usuario.json!');
    },

    // Nos muestra nuestro login
    login: (req, res) => {
        // console.log('Accediendo a la página de login');
        res.render('login');
    },
    // Para procesar un login teniendo en cuenta la contraseña y el email
    loginProcess: (req, res) => {
        const { email,password } = req.body;
        // console.log('Datos recibidos del formulario: ', {email, password});

        // Validacion minima
        if (!email || !password) {
            // console.log('Validacion minima fallida: Email y contraseña son obligatorios');
            return res.status(400).render('login', { error: 'Email y contraseña son obligatorios' });
        }

        const usuario = leerUsuarios();
        // cosonsole.log('Usuarios cargados',usuarios);

        // Normalizar email para comparar sin mayusculas/espacios-  funcion para limpiar strings
        function clean(s) {
            return String(s || '').trim().toLowerCase();
        }
        const usuario_seguro = usuario.find(u => clean(u.email)  === clean(email) && clean(u.password) === clean(password));
        // const password_seguro = usuario.find(u => clean(u.password) === clean(password));
        if (!usuario_seguro) { // || !password_seguro) {
            // console.log('Usuario o contraseña incorrectos');
            return res.status(401).render('login', { error: 'Usuario o contraseña incorrectos' });
        } else {
            // console.log('Login exitoso para el usuario:', usuario_seguro);
            // return res.render('/') //{ exito: 'Login exitoso, bienvenido ' + usuario_seguro.nombre + ' ' + usuario_seguro.apellido });
            // return res.redirect('/');

            return res.redirect('/?usuario=correcto');
        }
    }
}

module.exports = controller;




// Metodo de depuracion con console log
// O mostrar datos por res.jason para mostrar en el navegador












// processfORM: (req, res) => {
    // const { nombre, edad, email } = req.body;
    // console.log('Datos recibidos del formulario: ', {nombre, edad, email});
    // res.send('Formulario recibido, gracias por registrarte');
    // }

    // Plantilla de prueba para .ejs
    // home: (req, res) => { //MOSTRAR MOTOR DE PLANTILLAS
    //     // res.sendFile(path.join(__dirname, '../views/home.html'));
    //     res.render('home', {
    //         title: 'home',
    //         description: 'Bienvenido a la página de inicio'
    //     })
    // }

    //Para mostrar archivos .html
    // home: (req, res) => {
    //     res.sendFile(path.join(__dirname, '../views/home.html'));
    // },
    // productos: (req, res) => {
    //     res.sendFile(path.join(__dirname, '../views/productos.html'))
    // },
    // registrarse: (req, res) => {
    //     res.sendFile(path.join(__dirname, '../views/registrarse.html'))
    // }

//}
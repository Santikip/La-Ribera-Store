const express = require('express'); // requiere los modulos de express y los guarda en la variable express
const app = express(); // en la variable app, guardamos y declaramos como función a express
const path = require ('path');
const port = process.env.port || 3000; // puerto de nuestro servidor
// tiene dos variables. El puerto y la función

//console.log(__dirname) // nos muestra la ruta de nuestra carpeta

// app.get('/', (req,res) => { // con el senFile se puede mandar archivos, solo a traves de un ruta absoluta (path)
//     res.sendFile(path.join(__dirname, '/vista/home.html')); // de esta forma podemos cargar un archivo, a traves de sendfile
// }); 

app.use(express.static(path.join(__dirname, '/public'))); //sirve para unir el codigo del proyecto y cargar cosas estaticas
//con public no hace falta poner /public en el ruteo de html

// Ruta para cargar index.html cuando se acceda a /home
// app.get('/', (req, res) => {
//     let rutaHtml = path.join(__dirname, "/vista/home.html");
//     res.sendFile(rutaHtml, (err) => {
//         if (err) {
//             console.error('Error al enviar el archivo:', err);
//             res.status(err.status).end();
//         } else {
//             console.log('Archivo enviado correctamente');
//         }
//     });
// });

// Función reutilizable para enviar archivos HTML
const sendHtmlFile = (res, fileName) => {
    const filePath = path.join(__dirname, 'views', fileName);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`Error al enviar ${fileName}:`, err);
            res.status(err.status || 500).send("Error al cargar la página.");
        } // else {
            // console.log('Archivo enviado correctamente');
        // }
    });
};

// Rutas
app.get('/', (req, res) => sendHtmlFile(res, '/home.html'));
app.get('/productos', (req, res) => sendHtmlFile(res, '/productos.html'));
app.get('/registrarse', (req, res) => sendHtmlFile(res, '/registrarse.html'));

// hacemos escuchar a la variable app con listen (puerto , funcion)
app.listen(port, () => { console.log(`Serivdor funcionando en http:localhost:${port}`) }); // al poner el puerto 3000, se ejecuta la funcion de arriba
// levantamos el servidor

console.log(__dirname)

//console.log(__dirname) // nos muestra la ruta de nuestra carpeta
// __dirname se usa para hacer pruebas, nos indica la ruta de nuestro archivo

// Rutas de navegación
// app.get('/', (req,res) => { // al poner (.localhost:3000/) se realiza la siguiente funcion
//     res.send('mensaje') // nos muestra 'mensaje' (por medio de res.send) al abrir (.localhost:3000/)
// });
// app.get('/saludo', (req,res) => { // al poner (.localhost:3000/saludo) se realiza la siguiente funcion
//     res.send('Hola mundo') // nos muestra 'hola mundo' al abrir (.localhost:3000/saludo)
// })


// node app.js prender servidor. 
// apagar servidor ctrl + c
// (control k + c para comentar)

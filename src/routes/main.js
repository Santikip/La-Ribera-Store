const express = require('express');

const router = express.Router();
const mainController = require('./../controller/mainController');

router.get('/', mainController.home); // Ruta principal que muestra la página de inicio y los servicios

router.get('/servicios', mainController.servicios); // Ruta para mostrar los servicios

// Ruta  para el formulario
router.get('/registrarse', mainController.form);
router.post('/form', mainController.processform);

// Ruta para mostrar las personas registradas
router.get('/productos', mainController.personas);
router.get('/usuarios', mainController.usuarios);

// Ruta para mostrar el login
router.get('/login', mainController.login);
router.post('/login', mainController.loginProcess);

// const infoController = require('../controller/infoController');

// router.get('/cafetera', 'views/infoController/cafetera.ejs'); 

// router.get('/form', mainController.registrarse);

module.exports = router;
const express = require('express');
const app = express();

const Sequelize = require('sequelize');

//Definimos los parámetros de conexión con el nombre de la base de datos, el user y password
const sequelize = new Sequelize('postres_database','root','admin7',{
    host:'localhost',
    dialect:'mysql',
})

//Definimos el modelo con el nombre de la tablas y sus columnas
const postresModel = sequelize.define('postres',{
    "id": {type:Sequelize.INTEGER, primaryKey: true},
    "nombre": Sequelize.STRING,
    "calorias": Sequelize.INTEGER
})


//Nos autenticamos con sequelize a la base de datos y hacemos promesas para mostrar la conexión o capturar el error 
sequelize.authenticate()
    .then(()=>{
        console.log('CONEXIÓN A LA BASE DE DATOS ¡OK!')
    })
    .catch( error=>{
        console.log('El ERROR DE CONEXIÓN ES: ' + error)
    })


//Mostrar los datos de la tabla a través del modelo con los nombres de las columnas
    postresModel.findAll({attributes:['nombre','calorias']})
        .then(postres => {
            const resultados = JSON.stringify(postres) //Los traemos en formato JSON
            console.log(resultados)
        })
        .catch(error =>{
            console.log(error)
        })

//Nos conectamos al puerto 3000 y mandamos un mensaje a consola
        app.listen(3000, ()=>{
        console.log('SERVER UP en http://localhost:3000')
})
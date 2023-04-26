require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const app = express();
const db =require("./db");
app.use(cors());
app.use(express.json());


//busqueda de un usuario con contraseña en la base de datos
app.get("/api/v1/carSante/:nombre/:contrasena", async (req, res) => {
    const usuario= req.params.nombre;
    const clave = req.params.contrasena;
    //console.log(usuario);
    //console.log(clave);
    try {
      const usuarioEncontrado = await db.query("select * from usuario where correo = $1 AND clave = $2",[usuario,clave]);
    if (usuarioEncontrado.rows.length > 0){
        res.status(200).json({ mensaje: "Usuario encontrado", usuario });
    }else {
        res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
    } catch (err){
        console.error(err);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});
app.get("/api/v1/carSante",async (req,res)=> {
    try{
        const resultados = await db.query("select * from acelerometro");
        //console.log(resultados);
        res.status(200).json({
            status: "success",
            resultados: resultados.rows,
            data:{
            acelerometro: resultados.rows,
        },
        });
    }
    catch (err){
    }
});
//Get a car
app.get("/api/v1/carSantee/:id", async (req, res) => {
    console.log(req.params.id);
  
    try {
      const carro = await db.query("select * from automovil where id_automovil = $1",[req.params.id]);
      res.status(200).json({
        status:"success",
    });
        console.log(carro);
    } catch (err){
        console.log(err);
    }

});


// create user
app.post("/api/v1/carSante/createUser", async(req,res)=> {
    console.log(req.body);
    try{
        const resultados = await db.query("INSERT INTO usuario (nombre,nombre_sec,apellido,apellido_sec,correo,telefono,fecha_nac,clave,codigo_activacion)values ($1,$2,$3,$4,$5,$6,$7,$8,$9)",[req.body.nombre,req.body.nombre_sec,req.body.apellido,req.body.apellido_sec,req.body.correo,req.body.telefono,req.body.fecha_nac,req.body.clave,req.body.codigo_activacion])
    console.log(resultados)
    res.status(200).json({
        status: "succes",
    });

    }catch(err){
        console.log(err);
    }
 
});

// create automovile
app.post("/api/v1/carSante/createCar", async(req,res)=> {
    console.log(req.body);
    try{
        const resultados = await db.query("INSERT INTO automovil  (marca,fecha_tecnomec,km_actual,uca_fecha,uca_km,ucn_fecha,ucn_km,anio,id_propietario)values ($1,$2,$3,$4,$5,$6,$7,$8,$9)",[req.body.marca,req.body.fecha_tecnomec,req.body.km_actual,req.body.uca_fecha,req.body.uca_km,req.body.ucn_fecha,req.body.ucn_km,req.body.anio,req.body.id_propietario])
    console.log(resultados)
    res.status(200).json({
        status: "succes",
    });

    }catch(err){
        console.log(err);
    }
 
});
//update 
app.put("/api/v1/carSanteee/:id",async(req,res)=>{
    try{
        const resultado = await db.query("UPDATE usuario SET nombre = $1,nombre_sec = $2 where id_usuario=$3 returning *",[req.body.nombre,req.body.nombre_sec,req.params.id])
        console.log(resultado);
        res.status(200).json({
            status: "succes",
        });
    }catch(err){
        console.log(err);
    }
    
});
//delete
app.delete("/api/v1/carSanted/:id",async(req,res) =>{
    try{
        const resultado = await db.query("DELETE FROM usuario where id_usuario = $1", [req.params.id]);
        res.status(204).json({
            status: "Delete made succesfully",
        });
    }
    catch(err){
        console.log(err);
    }

});
const puerto = process.env.PUERTO||4000;
app.listen(puerto, () => {
    console.log(`Servidor activo :D, puerto ${puerto}`);
});
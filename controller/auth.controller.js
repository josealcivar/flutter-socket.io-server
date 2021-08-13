
const {response} = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/user');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res=response) =>{

    const {email, password} = req.body;

    try {
        const existeEmail = await Usuario.findOne({email});

        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg: 'el correo ya esta registrado'
            });
        }
    
    
        const usuario = new Usuario(req.body);
        // Encriptar contrasena
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        
        await usuario.save();
    
        const token = await generarJWT(usuario.id);

        res.json({
            ok:true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el Administrador'
        });
    }

}

const login = async (req, res = response)=>{
    const {email, password} = req.body;
      
    try {
        const usuarioDB = await Usuario.findOne({email});
        console.log(usuarioDB);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'usuario y contrasena no validas'
            });
        }
    
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'contrasena invalida'
            });
        }

        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok:true,
            usuario: usuarioDB,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el Administrador'
        });
    }
}



const renewToken = async(req, res =response)=>{

    const uid = req.uid;

    const token = await generarJWT(uid);

    const usuario = await Usuario.findById(uid);

    res.json({
        ok:true,
        usuario,
        token
    });
 
}

module.exports = {crearUsuario, login, renewToken};
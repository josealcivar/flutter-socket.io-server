const jwt = require('jsonwebtoken');


const generarJWT = ( uid )=>{
return new Promise((resolve, reject)=>{
    const payload = { uid };
    console.log(payload);
jwt.sign(payload, process.env.SECRETKEY,{
    expiresIn: '12h'
},(err, token) =>{
    if(err){
        reject('No se pudo generar Token');
    }else{
        //TOKEN!
        resolve(token);
    }
});

});

}


module.exports = generarJWT;
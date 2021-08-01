
const { io } = require('../index');

//mensajes de S0cket
io.on('connection', client => {
    //   client.on('event', data => { 
    
    //       });
    console.log("cliente Conectado");
      client.on('disconnect', () => { 
       console.log('cliente desconectado');
      });
    
      client.on('message', (payload)=>{
          console.log(`message recivied, ${payload.nombre} ${payload.apellido}`);
      });
    
      client.emit('send message', { message:"se recibio msj"});
    });
    
    
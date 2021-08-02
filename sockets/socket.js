
const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');


const bands = new Bands();
console.log('init server');

bands.addBand(new Band('Salserin'));
bands.addBand(new Band('Magneto'));
bands.addBand(new Band('Street Fighter'));
bands.addBand(new Band('440'));

// console.log(bands);

//mensajes de S0cket
io.on('connection', client => {
    //   client.on('event', data => { 
    
  client.emit('active-bands', bands.getBands());

    //       });
    console.log("cliente Conectado");
      client.on('disconnect', () => { 
       console.log('cliente desconectado');
      });
    
      client.on('message', (payload)=>{
          console.log(`message recivied, ${payload.nombre} ${payload.apellido}`);
      });
    
      client.emit('send message', { message:"se recibio msj"});

      client.on('emitir-mensaje',(payload) =>{
        console.log(payload);
        io.emit('emitir-mensaje', "HOLAAA MI PANA");
      });

      //vote-bands
      client.on('vote-bands', (payload)=>{
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
      });


           //add-bands
           client.on('add-band', (payload)=>{
            bands.addBand(new Band(payload.name));
            io.emit('active-bands', bands.getBands());
          });


           //delete-bands
           client.on('delete-band', (payload)=>{
            bands.deleteBands(payload.id);
            io.emit('active-bands', bands.getBands());
          });
          
      

    });
    
    
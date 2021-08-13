const mongoose = require('mongoose');

const dbConnection = async() =>{
    try {
        
        mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true, 
            useUnifiedTopology: true,
             useCreateIndex:true
            });

            console.log("init db MongoDB");

            
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos');
    }

}

module.exports = { dbConnection};

// mongoose.connect('mongodb://localhost:27017/test', 
// {useNewUrlParser: true, useUnifiedTopology: true});

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
const { v4: uuidV4} = require('uuid');
const Band = require('./band');

class Bands {
    constructor(){
        this.bands = [];
    }

    addBand( band = new Band()){
        this.bands.push(band);
    }

    getBands(){
        return this.bands;
    }

    deleteBands(id = ''){
        this.bands = this.bands.filter(band => band.id !== id);
        return this.bands;
    }

    async voteBand(id = '') {
        this.bands = await  this.bands.map(band =>{
           if(band.id === id){
                band.votes++;
            }
            return band;
        });
    }
}


module.exports = Bands;
const mongoose = require('mongoose');

const MONGOURI= process.env.MONGOURI

const initMongo= async ()=>{
    try{

        await mongoose.connect(MONGOURI,{
            useNewUrlParser:true,
            useUnifiedTopology: true
        });
        console.log('mongoose connected!!!')
    }
    catch(err){
        console.log('An error occurred')
    }
}

module.exports = initMongo
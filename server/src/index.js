const express= require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

//all currences
app.get("/getAllCurrencies",async (req,res)=>{
    const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=7ec3cb193cda42e1abafcdb900ae72ae";

 

    try{

        const namesResponse = await axios.get(nameURL);
        const nameData=namesResponse.data;
    
        return res.json(nameData);

    } catch (err){
        console.error(err);
    }



});

//get the target amount
app.get("/convert",async(req,res)=>{
    const{date,
        sourceCurrency,
        targetCurrency,
        amountInSourceCurrency}=req.query;
    try{
        const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=7ec3cb193cda42e1abafcdb900ae72ae`;
    
        const dataResponse = await axios.get(dataUrl);
        const rates= dataResponse.data.rates;

        //rates
        const sourceRate= rates[sourceCurrency];
        const targetRate= rates[targetCurrency];


        //final target val
        const targetAmount= (targetRate/sourceRate)* amountInSourceCurrency;

        return res.json(targetAmount);
    
    } catch(err){
        console.error(err);
    }


});


//listener port
app.listen(5000,()=>{
    console.log("SERVER STARTED");
});  
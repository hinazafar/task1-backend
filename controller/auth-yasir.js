const express = require('express');
const app=express();
//const dbConnection = require('./mysqlConnection');
const dbConnection = require('./controller/dbConnection');

app.use(express.json());
// enable parsing of  form urlencoded data.
app.use(express.urlencoded({extended:true}));
//const add = require('./mysqlConnection');
const db=dbConnection();
let query="select * from user";
db.query(query,(err,result)=>{
            if(err)
            {console.log({msg:err});}
            else
            { console.log({msg:result});}
        })
   
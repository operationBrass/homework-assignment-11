
//import modules
const express = require('express');
const fs = require('fs');

// assign express object to app;
const expressServer = express();
const PORT = 8080;

expressServer.get('/notes',(req,res) => 
{
    fs.readFile('./notes.html',{ 'content-type':'text/html' },(err,notes) => 
    {
        if (err) return err;
        res.send(notes);
    });
});

expressServer.listen(PORT,() => {console.log("listening on Port: ", PORT)});





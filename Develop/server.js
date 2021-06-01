
//import modules
const express = require('express');
const fs = require('fs');

// assign express object to app;
const expressServer = express();
const PORT = 8080;

expressServer.get('/notes',(req,res) => 
{
    fs.readFile('./public/notes.html',{ 'content-type':'text/html' },(err,notes) => 
    {
        if (err) return err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(notes);
    });
});

expressServer.get('*',(req,res) => 
{
    fs.readFile('./public/index.html',{ 'content-type':'text/html' },(err,home) => 
    {
        if (err) return err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(home);
    });
});


expressServer.listen(PORT,() => {console.log("listening on Port: ", PORT)});





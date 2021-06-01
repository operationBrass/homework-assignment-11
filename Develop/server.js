
//import modules
const express = require('express');
const fs = require('fs');
const { type } = require('os');

// assign express object to expressServer;
const expressServer = express();
const PORT = 8080;

//create get listeners

expressServer.get('/notes',(req,res) => 
{
    fs.readFile('./public/notes.html',(err,notes) => 
    {
        if (err) return err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(notes);
    });
});


expressServer.get('/api/notes',(req,res) => 
{
    fs.readFile('./db/db.json',{'content-type':'application/json'},(err,data) => 
    {
        if (err) return err;
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
    });

});

expressServer.get('*',(req,res) => 
{
    fs.readFile('./public/index.html',{'content-type':'text/html'},(err,home) => 
    {
        if (err) return err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(home);
    });
});


//GET /api/notes should read the db.json file and return all saved notes as JSON.
expressServer.listen(PORT,() => {console.log("listening on Port: ", PORT)});





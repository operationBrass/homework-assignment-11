//import modules
const express = require('express');
const fs = require('fs');

// assign express object to expressServer;
const app = express(); //app being convention for Express() 
const PORT = 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('./public'));


//create get listeners

app.get('/notes',(req,res) => 
{
    fs.readFile('./public/notes.html',(err,notes) => 
    {
        if (err) return err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(notes);
    });
});

app.get('/js/index.js',(req,res) => 
{
    fs.readFile('./public/js/index.js',(err,notes) => 
    {
        if (err) return err;
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.end(notes);
    });
});


app.get('/api/notes',(req,res) => 
{
    fs.readFile('./db/db.json',{'Content-Type':'application/json'},(err,data) => 
    {
        if (err) return err;
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
    });

});

app.get('*',(req,res) => 
{
    fs.readFile('./public/index.html',{'content-type':'text/html'},(err,home) => 
    {
        if (err) return err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(home);
    });
});

app.post('/api/notes',(req,res) => 
{
    const userNote = req.body;

    fs.appendFile('./db/db.json',(err,data) => 
    {
        if (err) return err;
        return app.json(userNote);
    });

});


        
app.listen(PORT,() => {console.log("listening on Port: ", PORT)});





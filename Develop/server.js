//import modules
const { Console } = require('console');
const express = require('express');
const fs = require('fs');

// assign express object to expressServer;
const app = express(); //app being convention for Express() 
const PORT = 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// add file directory paths for the get requests 
const __js = "/assets/js/index.js";
const __css = "/assets/css/styles.css";
const __notes = "/notes";
const __apiNotes = "/api/notes";

//create get listeners

app.post('/api/notes',(req,res) => 
{
    const userNote = req.body;

    fs.readFile('./db/db.json', (err, data) =>
    {
        if (err) return err;
        let notes = JSON.parse(data);
        notes.push(userNote);
        fs.writeFile('./db/db.json', JSON.stringify(notes,null,2),() => {
            console.log("file updated");
        });
    });

});

app.get('/api/notes',(req,res) => 
{

    fs.readFile('./db/db.json',{'content-type':'application/json'},(err,data) => {

        if (err) return err;
        res.writeHead(200);  
        res.end(data);
    });

});

app.get('*',(req,res) => 
{

    // check what the url is and return the file that is associated with it. 

    let contentType = {};
    let filePath = '';

    switch (req.url)
    {
        case __js:
            filePath = "./public/assets/js/index.js";
            contentType = {'content-type':'text/javascript'};
            break;
        case __css:
            filePath = "./public/assets/css/styles.css";
           contentType = {'content-type':'text/css'};
           break;
        case __notes:
            filePath = "./public/notes.html";
            contentType = {'content-type':'text/html'};
            break;
        default: //index.html
            filePath = "./public/index.html";
            contentType = {'content-type':'text/html'};
    }

    fs.readFile(filePath,contentType,(err,data) => {

        if (err) return err;
        res.writeHead(200);  
        res.end(data);
    });
  
});

app.listen(PORT,() => {console.log("listening on Port: ", PORT)});





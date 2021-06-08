//import modules    
const express = require('express');
const fs = require('fs');
const path = require('path');

// vue NPM package for generating UUIDs
const { v4: uuidv4 } = require('uuid');


// assign express object to expressServer;
const app = express(); //app being convention for Express() 
const PORT = process.env.PORT || 8000;

express.static(path.join(__dirname, '/Develop/public'));
express.static(path.join(__dirname, '/Develop/db'));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// add file directory paths for the get requests 
const __js = "/assets/js/index.js";
const __css = "/assets/css/styles.css";
const __notes = "/notes";
const __apiNotes = "/api/notes";
const __delPath = "/api/notes/:id"

//create post and get listeners


app.post(__apiNotes,(req,res) => 
{
    const userNote = req.body;
    const newID = uuidv4();
    userNote.id = newID; //add new key-value pair id to usernotes

    fs.readFile(path.join(__dirname,'/Develop/db/db.json'), (err, data) =>
    {
        if (err) return err;
        let notes = JSON.parse(data);
        notes.push(userNote);
        fs.writeFile(path.join(__dirname,'/Develop/db/db.json'), JSON.stringify(notes,null,2),() => {
            
        });
    });
});

app.get(__apiNotes,(req,res) => 
{

    fs.readFile(path.join(__dirname,'/Develop/db/db.json'),{'content-type':'application/json'},(err,data) => {
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
    console.log(req.url);
    switch (req.url)
    {
        case __js:
            filePath = path.join(__dirname,"/Develop/public/assets/js/index.js");
            contentType = {'content-type':'text/javascript'};
            break;
        case __css:
            filePath = path.join(__dirname,"/Develop/public/assets/css/styles.css");
           contentType = {'content-type':'text/css'};
           break;
        case __notes:
            filePath = path.join(__dirname,"/Develop/public/notes.html");
            contentType = {'content-type':'text/html'};
            break;
        default: //index.html
            filePath = path.join(__dirname,"/Develop/public/index.html");
            contentType = {'content-type':'text/html'};
    }
    fs.readFile(filePath,contentType,(err,data) => {

        if (err) return err;
        res.writeHead(200);  
        res.end(data);

    });
});

app.delete(__delPath,(req,res) => {

    console.log(req.params.id);

    fs.readFile(path.join(__dirname,'/Develop/db/db.json'), (err, data) =>
    {
        if (err) return err;
        let notes = JSON.parse(data);
        let modifiedNotes = notes.filter(data => data.id != req.params.id); //new array is created with all objects excluding the one to del.
        fs.writeFile(path.join(__dirname,'/Develop/db/db.json'), JSON.stringify(modifiedNotes,null,2),() => {
        });
    });

});

app.listen(PORT,() => {console.log("listening on Port: ", PORT)});





const { Router } = require("express");
let express = require("express");
const MongoClient = require('mongodb').MongoClient;
const axios = require('axios');
const bodyParser = require('body-parser');

let app = express();
let port = 3000;

app.use(express.static("./static"));

app.listen(port, function() {
    console.log(`Listening at http://localhost:${port}`);
});

const router = new Router();

app.use(router);
app.use(bodyParser.json());

var database= {};
 
async function connectToBase () {
    return new Promise((resolve, reject) =>{ MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
    if (err) {
    reject(err);
            } else {
    database = db;
    resolve()
    console.log("successfully connected to the database");
            }
        });
})};

router.route('/predict').post(async function(req, resp, next) {
    try {
        console.log(req);
        constobject = req.body;
        console.log(object); 
        connectToBase().then(() => {
        database.collection("aicesi").insert(object, null, function(error, result) {
        if (error) throwerror;   
                });
        database.close();
        resp.statut.send();
    })}
    catch {
    console.error();
        }
});

router.route('/show').get(function(req, resp, next) {
    try {
        connectToBase();

        database.collection("iacesi").find().toArray(function (error, results) {
            if (error) throw error;
            var array = [];
            results.forEach(function(i, obj) {
                array.push(console.log(
                    "date : " + obj.date + ";",           
                    "nom : " + obj.name + ";",                  
                    "taille : " + obj.taille.toString() + "Mo;",
                    "Animaux : " + obj.predict.animaux.toString() + ";",
                    "Humains : " + obj.predict.humains.toString() + ";",
                    "Perso : " + obj.predict.perso.toString() + ";",
                    "Plantes : " + obj.predict.plantes.toString() + ";",
                    "Vehicules : " + obj.predict.vehicules.toString() + ";",
                    "Prédit : " + obj.predicted + ";"
                ));
            });
        });

        database.close();

        return array;

    } catch {
        console.error();
    }
});


router.route('/delete').delete(function(req, resp, next) {
    try {

        const id = req.body;

        connectToBase();

        database.collection("aicesi").remove(id, null, function(error, result) {
            if (error) throw error;   
        });

        database.close();
        resp.statut.send();
    } catch {
        console.error();
    }
});
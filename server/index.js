//const express = require("express");
//const { Files } = require("./files.mjs");

import express from "express";
import mongodb, { ObjectId } from "mongodb";
import multer from "multer";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

const port = 3000;

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });


//// DATA
const user = 
{
    Username: "Jurica"
}
////

const connectToDB = async () => 
{
    const url = "mongodb://127.0.0.1:27017";
    const client = new mongodb.MongoClient(url);
    const dbName = "mycloud";

    try
    {
        await client.connect();
        console.log("MongoDB connected");
    }
    catch (exc)
    {
        console.log(exc);
    }

    let db = client.db(dbName);
    let bucket = new mongodb.GridFSBucket(db);

    return { db, bucket };
}

(
    async () => 
    {
        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        let { db, bucket } = await connectToDB();

        app.use(express.static('../client/dist/client'));

        app.get('/files', (req, res) => {
            res.sendFile(path.join(__dirname, "../client/dist/client/index.html"));
        });

        app.get('/newfile', (req, res) => {
            res.sendFile(path.join(__dirname, "../client/dist/client/index.html"));
        });

        app.get("/api/user", (req, res) => 
        {
            res.send(user);
        });

        app.get("/api/files", async (req, res) => 
        {
            const files = await db.collection("files").find({}).toArray();
            res.jsonp(files);
        });

        app.get("/api/files/:_id", (req, res) => {
            db
                .collection("files")
                .findOne({ "_id": ObjectId(req.params._id) }, async (err, file) => {
                    //if (err) throw err;

                    console.log(path.join(__dirname + "/files/" + req.params._id));
                    console.log(file.Name);

                    res.download(path.join(__dirname + "/files/" + req.params._id), file.Name);
                });
        });

        app.post("/api/files", upload.single("file"), async (req, res) =>
        {
            let id;
            
            var file = 
            {
                Name: req.file.originalname,
                Size: req.file.size,
                UploadDate: Date.now()
            }

            db
                .collection("files")
                .insertOne(file, async (err, res) =>
                {
                    //if (err) throw err;

                    if (!fs.existsSync('./files'))
                        fs.mkdirSync('./files');

                    id = res.insertedId.toString();

                    fs.writeFileSync(`./files/${id}`, req.file.buffer);

                    console.log("inserted");
                });

            db
                .collection("files")
                .findOne(ObjectId(id), async (err, file) => 
                {
                    res.send({ message: "Successfully uploaded" });
                });

            
        });

        app.delete("/api/files/:_id", async (req, res) => 
        {
            console.log(req.params._id)

            db
                .collection("files")
                .deleteOne({ "_id": ObjectId(req.params._id) }, async (err, res) => {
                    //if (err) throw err;

                    fs.unlink(`./files/${req.params._id}`, (err) =>
                    {
                        //if (err) throw err;

                        console.log("file deleted");
                    });

                    console.log("deleted");
                });

            res.send({ message: "Successfully deleted" });

        });

        app.listen(port, () => 
        {
            console.log(`Server is listening at ${port}`);
        });
    }
)();




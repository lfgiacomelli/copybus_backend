import express from "express";

const server = express();

const PORT = process.env.PORT || 3000;

server.get("/", (req, res) => {
    res.status(200).send("Primeira rota");
});

server.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})
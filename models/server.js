const fs = require("fs");
const url = require("url");
const path = require("path");

const express = require("express");
const Jimp = require("jimp");

class Server {
	constructor() {
		this.app = express();
		this.port = 3000;

		// Middlewares
		this.middlewares();
	}

	middlewares() {
		this.app.use(express.static("public"));

		this.app.get("/imageProcessing", (req, res) => {
			const params = url.parse(req.url, true).query;
			const archivoImagen = params.archivoImagen;
			Jimp.read(`${archivoImagen}`, (err, imagen) => {
				imagen
					.resize(350, Jimp.AUTO)
					.grayscale()
					.quality(60)
					.writeAsync("newImg.jpg")
					.then(() => {
						fs.readFile("newImg.jpg", (err, imagen) => {
							res.writeHead(200, { "Content-Type": "image/jpeg" });
							res.end(imagen);
						});
					});
			});
		});
		this.app.get("*", (req, res) => {
			res.sendFile(path.join(__dirname, "../public", "404.html"));
		});
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server up and listening at http://localhost:${this.port}`);
		});
	}
}

module.exports = Server;

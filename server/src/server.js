const express = require('express');
const routes = require('./routes.js');
const cors = require('cors');
const app = express();
require('./database');

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json());
app.use(routes);

const start = (port) => {
	try {
		app.listen(port, () => {
			console.log(`app running at: http://localhost:${port}`);
		});
	} catch (err) {
		console.error(err);
		process.exit();
	}
};

start(3000);

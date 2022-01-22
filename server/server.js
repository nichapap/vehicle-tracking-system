const makeApp = require('./app');
const database = require('./database');

const app = makeApp(database);

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

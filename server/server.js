import database from './database.js';
import makeApp from './app.js';

const port = 9000;

const app = makeApp(database);
app.listen(port, () => console.log(`Server is running on port ${port}`));

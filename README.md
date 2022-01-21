# Vehicle Tracking System 🚚

## Prerequisite

- MAMP/XAMPP or other server environment of your choice
- Node.js v14.18.3 or above
- npm v6 or above

---

## 💪🏻 Set up

1. Clone thi repo using `git clone https://github.com/nichapap/vehicle-tracking-system.git`.
2. Import `sql/vehicle_tracking_system.sql` to the database.

### SQL Structure

```
vehicle_tracking_system
├── coordinates                   # List of coordinates of all the vehicles
└── vehicles                      # List of all the vehicles
```

> Sample data dumped when you're done importing the file

---

## 🏁 How to start

Consist of 2 parts to start the website.

### 🗄 Server

1. After go to `vehicle-tracking-system`, move to the `server` directory: `cd server`.
2. Run `npm i` in order to install dependencies.
3. Run `npm run start`.
   <br/>_At this point, the server is running on port: 9000 or `http://localhost:9000`_

### 🖥 Client

1. After go to `vehicle-tracking-system`, move to the `client` directory: `cd client`.
2. Run `npm i` in order to install dependencies.
3. Run `npm start`.
   <br/>_At this point, the website is running on port: 3000 or `http://localhost:3000`_

---

## ⚠️ Troubleshoot

**Cannot connect to the database?**
<br/>Check `server/index.js` if the config is align with your database.

```
const db = mysql.createConnection({
  user: 'root',
  password: 'root',
  host: 'localhost',
  port: '8889',
  database: 'vehicle_tracking_system',
});
```

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3006;
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');



app.use(cors());
app.use(express.json());


app.use(session({secret: 'secret', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

passport.use(
    new LocalStrategy((username, password, done) => {
        connection.query(
            'SELECT * FROM users WHERE username = ?', [username],
            function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user[0]) {
                return done(null, false, {message: 'Incorrect username'});
            }
            if (!bcrypt.compareSync(password, user[0].password)) {
                return done(null, false, {message: 'Incorrect password'});
            }
            return done(null, user[0]);
        }
        )
    })
)

passport.serializeUser(function(user, done)  {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    connection.query('SELECT * FROM users WHERE id = ?', [id], function(err, user) {
        done(err, user[0]);
    });
});





app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = bcrypt.hashSync(req.body.password, saltRounds);
    const id = uuidv4();

    
    connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
        if (error) {
            res.status(500).send({ error: error });
            return;
        }

        if (results.length > 0) {
            res.status(400).send({ error: 'Username is in use' });
            return;
        }

        
        connection.query('INSERT INTO users SET ?', {id: id, username: username, password: password},
        (error, results, fields) => {
            if (error) {
                console.log(id, username, password);
                console.log(error);
                res.status(500).send({ error: error });
                return;
            }
            console.log(id, username, password);
            res.status(200).send({ success: 'User registered'});
        });
    });
});

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).send({ success: 'You are logged in'});
});

app.post('/favorites', (req, res) => {
    const {gif_id, url, title} = req.body;
    const id = req.user_id;

    connection.query('INSERT INTO favorites SET?', 
    {favorite_id: uuidv4(), user_id: user_id, gif_id: gif_id},
    (error, results, fields) => {
    if (error) {
        res.status(500).send({ error: error });
        return;
    }
    res.status(200).send({ success: 'Favorite added'});
    }
    )
})


app.listen(port, () => {
    console.log("App listening at: " + port);
});
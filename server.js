// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// =============================================================
let tables = [{
        routeName: "yoda",
        table: "table #1",
        ID: "0001",
        name: "Yoda",
        email: "abc@gmail.com",
        phone: 000-000-0000
    },
    {
        routeName: "darthmaul",
        table: "table #2",
        ID: "0002",
        name: "Luke",
        email: "def@gmail.com",
        phone: 111-111-1111
    },
    {
        routeName: "obiwankenobi",
        table: "table #3",
        ID: "0003",
        name: "Darth",
        email: "ghi@gmail.com",
        phone: 222-222-2222
    }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/view", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api_table", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
})

app.get("/api_waitlist", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
})

// Displays all tables
app.get("/api/tables", function (req, res) {
    return res.json(tables);
});

// Displays a single character, or returns false
app.get("/api/tables/:table", function (req, res) {
    var chosen = req.params.table;

    console.log(chosen);

    for (var i = 0; i < tables.length; i++) {
        if (chosen === tables[i].routeName) {
            return res.json(tables[i]);
        }
    }

    return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/tables", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newcharacter = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

    console.log(newcharacter);

    characters.push(newcharacter);

    res.json(newcharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
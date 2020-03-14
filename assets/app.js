var firebaseConfig = {
    apiKey: "AIzaSyAwEuw4iUGu9GXY7f8Qe7Y3xTVUFW3yJ90",
    authDomain: "train-schedule-hw-cb87e.firebaseapp.com",
    databaseURL: "https://train-schedule-hw-cb87e.firebaseio.com",
    projectId: "train-schedule-hw-cb87e",
    storageBucket: "train-schedule-hw-cb87e.appspot.com",
    messagingSenderId: "72708101554",
    appId: "1:72708101554:web:a5cfbb326c5a04afc140ab"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();


//Arrays diffe
var train_names = ["Trenton Express", "Oregon Trial", "Midnight Camage", "Sing Sing Caravan",
    "Boston Bus", "California Caravan", "Analben's Train"];

var destinations = ["Trenton", "Salem, Oregon", "Philadelphia", "Atlanta", "Boston",
    "San Francisco", "Florida"];

var frequencies = [25, 3600, 15, 45, 65, 6000, 25];

var next_train = [];

var minutes_away = [];

// Input variables: from the form
var train_name = "";
var destination = "";
var first_time = "";
var frequency = "";

// Variables for times
var next_arrival = "";
var min_away = "";
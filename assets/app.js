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
var train = "";
var place = "";
var time = "";
var frequency = "";

// Variables for times
var next_arrival = "";
var min_away = "";

// Capture Button Click
$("#submit").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    train = $("#train-name-input").val().trim();
    train_names.push(train);

    place = $("#destination-input").val().trim();
    destinations.push(place);

    time = $("#first-time-input").val().trim();

    frequency = $("#frequency-input").val().trim();
    frequencies.push(frequency);

    database.ref().push({
        train_name: train,
        destination: place,
        first_time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

function InitializeFirebase(){

    for(i=0;i<train_names.length;i++){

        train = train_names[i];
        place = destinations[i];
        time = "";
        frequency = frequencies[i];

        database.ref().push({
            train_name: train,
            destination: place,
            first_time: time,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
       }
}

database.ref().on("child_added", function(added) {


    console.log(added.val().train_name);
    console.log(added.val().destination);
    console.log(added.val().first_time);
    console.log(added.val().frequency);


   
    $("#train-list").append("<tr><td>" + added.val().train_name + 
      " </td><td>" + added.val().destination +
      " </td><td> " + added.val().frequency +
      " </td><td>" + "" +
      " </td><td> " + "" +
      " </td><td>" + "" +
      " </td></tr>");

 
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

  InitializeFirebase();

  

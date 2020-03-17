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

// Input variables: from the form
var train = "";
var place = "";
var time = "";
var frequency = "";



// Capture Button Click
$("#submit").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    train = $("#train-name-input").val().trim();

    place = $("#destination-input").val().trim();

    time = $("#first-time-input").val().trim();

    frequency = $("#frequency-input").val().trim();

    database.ref().push({
        train_name: train,
        destination: place,
        first_time: time,
        frequency: frequency,
    });

    //Reset Forms
    $("#train-name-input").val("");

    $("#destination-input").val("");

    $("#first-time-input").val("");

    $("#frequency-input").val("");
});


database.ref().on("child_added", function (added) {


    var firstTimeConverted = moment(added.val().first_time, "HH:mm").subtract(1, "years");

    // Difference between the first train and current time
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart
    var tRemainder = diffTime % added.val().frequency;

    // Minute Until Train
    var tMinutesTillTrain = added.val().frequency - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");

    $("#train-list").append("<tr><td>" + added.val().train_name +
        " </td><td>" + added.val().destination +
        " </td><td> " + added.val().frequency +
        " </td><td>" + nextTrain +
        " </td><td> " + tMinutesTillTrain +
        " </td></tr>");


}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


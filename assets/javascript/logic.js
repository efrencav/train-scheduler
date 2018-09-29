// Initialize Firebase
var config = {
    apiKey: "AIzaSyA61znLMiETxwLYhoqhZxGEPX-m6b5QUE4",
    authDomain: "train-scheduler-902d4.firebaseapp.com",
    databaseURL: "https://train-scheduler-902d4.firebaseio.com",
    projectId: "train-scheduler-902d4",
    storageBucket: "train-scheduler-902d4.appspot.com",
    messagingSenderId: "594872294990"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

var trainNumber = 0;
var nextTrain = null;
var firstTimeConverted =null;
var tMinutesTillTrain = null;

// On click event associated with the add train information
// Capture Button Click
$("#add-train").on("click", function (event) {
    // prevent form from trying to submit/refresh the page
    event.preventDefault();

    var trainScheduler = {
        name: '',
        destination: '',
        time: '',
        frequency: '',
        minutes: '',
        nextTrain,
        
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };
    var firstTimeConverted = null;
    var minutesUntilTrain = null;

    // Capture User Inputs and store them into variables
    trainScheduler.name = $("#train-name").val().trim();
    trainScheduler.destination = $("#destination-display").val().trim();
    trainScheduler.time = $("#train-time-display").val().trim();
    trainScheduler.frequency = $("#frequency-display").val().trim();

    console.log("Train Name: " + trainScheduler.name);
    console.log("Destination: " + trainScheduler.destination);
    console.log("Time: " + trainScheduler.time);
    console.log("Frequency: " + trainScheduler.frequency);

    var newTrainInfo = {
        trainName: trainScheduler.name,
        destination: trainScheduler.destination,
        time: trainScheduler.time,
        frequency: trainScheduler.frequency
    };

    database.ref().push(trainScheduler);

    clearForm();

});

function clearForm() {
    document.getElementById("trainForm").reset();
};

// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
database.ref().on("value", function (snapshot) {
    // Print the initial data to the console.
    console.log(snapshot.val());

    // Store everything into a variable
    trainName = snapshot.val().trainName;
    destination = snapshot.val().destination;
    time = snapshot.val().time;
    frequency = snapshot.val().frequency;

    // Employee information
    console.log(trainName);
    console.log(destination);
    console.log(time);
    console.log(frequency);

    // First time pushed back a year to make sure it comes before current time
    firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // Create new rows
    var newRow = $("<tr>").append (
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(time),
        $("<td>").text(frequency),
        $("<td>").text(trainName),
    );

    // Append a new role to the table
    $("#mainSchedule > tbody").append(newRow);
});

    function displayTime () {
        var currentTime = moment().format("MMM Do YYYY, h:mm:ss a");
        $("#currentTime").text(currentTime);
    }

    setInterval(displayTime, 1000);
    
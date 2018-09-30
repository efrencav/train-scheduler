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
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    trainNumber++;

    // // Capture User Inputs and store them into variables
    trainScheduler.name = $("#train-time").val().trim();
    trainScheduler.destination = $("#destination").val().trim();
    trainScheduler.time = $("#time").val().trim();
    trainScheduler.frequency = $("#frequency").val().trim();
    trainScheduler.minutes = $("#minutes-away-display").val().trim();
    

    

    database.ref().push(trainScheduler);

});

// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
// database.ref().on("value", function (snapshot) {

//     // Print the initial data to the console.
//     console.log(snapshot.val());

//     // Log the value of the various properties
//     // console.log(snapshot.val().name);
//     // console.log(snapshot.val().destination);
//     // console.log(snapshot.val().time);
//     // console.log(snapshot.val().frequency);
//     // console.log(snapshot.val().minutes);

//     // Change the HTML
//     $("#name-display").text(snapshot.val().name);
//     $("#destination-display").text(snapshot.val().destination);
//     $("#train-time-display").text(snapshot.val().time);
//     $("#frequency-display").text(snapshot.val().frequency);
//     $("#minutes-away-display").text(snapshot.val().minutes);
// }, function (errorObject) {
//     console.log("The read failed: " + errorObject.code);
// });

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var newPost = childSnapshot.val();
    // Print the initial data to the console.
    console.log(newPost.name);
    trainNumber++;
    // Log the value of the various properties
    // console.log(snapshot.val().name);
    // console.log(snapshot.val().destination);
    // console.log(snapshot.val().time);
    // console.log(snapshot.val().frequency);
    // console.log(snapshot.val().minutes);
    var newRow = $("<tr>").attr('data-num', trainNumber);

    var newTrainRow = $("<td class='name-display'>").text(newPost.name);
    var newDestinationRow = $("<td class='destination-display'>").text(newPost.destination);
    var newTimeRow = $("<td class='train-time-display'>").text(newPost.time);
    var newFrequencyRow = $("<td class='frequency-display'>").text(newPost.frequency);
    // var newMinutesAwayRow = $("<td class='minutes-away-display'>").text(trainScheduler.minutes);

    newRow.append(newTrainRow, newDestinationRow, newTimeRow, newFrequencyRow);

    $("tbody").append(newRow);
    // Change the HTML
    // $("#name-display" + trainNumber).text(newPost.name);
    // $("#destination-display" + trainNumber).text(newPost.destination);
    // $("#train-time-display" + trainNumber).text(newPost.time);
    // $("#frequency-display" + trainNumber).text(newPost.frequency);
    // var newMins= $("#minutes-away-display").text(newPost.minutes);

    // $("#tableRows").append(newRow);
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

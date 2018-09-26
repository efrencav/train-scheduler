

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
  
var trainScheduler = {
  name: '',
  destination: '',
  time: '',
  frequency: '',
  minutes: ''
};

// On click event associated with the add train information
// Capture Button Click
$("#add-train").on("click", function(event) {
  // prevent form from trying to submit/refresh the page
  event.preventDefault();

  // Capture User Inputs and store them into variables
  trainScheduler.name = $("#train-time").val().trim();
  trainScheduler.destination = $("#destination").val().trim();
  trainScheduler.time = $("#time").val().trim();
  trainScheduler.frequency = $("#frequency").val().trim();
  trainScheduler.minutes = $("#minutes-away-display").val().trim();

  var newTrainRow = $("<td id='name-display' scope='row'>");
  var newDestinationRow = $("<td id='destination-display' scope='row'>");
  var newTimeRow = $("<td id='train-time-display' scope='row'>");
  var newFrequencyRow = $("<td id='frequency-display' scope='row'>");
  var newMinutesAwayRow = $("<td id='minutes-away-display' scope='row'>");
  
  // newTrainDetail;
  // newTrainRow.attr("id", `${trainScheduler.name}`);
  newTrainRow.prepend(`${trainScheduler.name}`);
  newDestinationRow.prepend(`${trainScheduler.destination}`);
  newTimeRow.prepend(`${trainScheduler.time}`);
  newFrequencyRow.prepend(`${trainScheduler.frequency}`);
  // newMinutesRow.prepend(`${trainScheduler.minutes}`);

  database.ref().set(trainScheduler);

});



// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
database.ref().on("value", function(snapshot) {

  // Print the initial data to the console.
  console.log(snapshot.val());

  // Log the value of the various properties
  console.log(snapshot.val().name);
  console.log(snapshot.val().destination);
  console.log(snapshot.val().time);
  console.log(snapshot.val().frequency);
  console.log(snapshot.val().minutes);

  // Change the HTML
  $("#name-display").text(snapshot.val().name);
  $("#destination-display").text(snapshot.val().destination);
  $("#train-time-display").text(snapshot.val().time);
  $("#frequency-display").text(snapshot.val().frequency);
  $("#minutes-away-display").text(snapshot.val().minutes);
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});
// Console log each of the user inputs to confirm we are receiving them
// console.log(trainScheduler.name);
// console.log(trainScheduler.destination);
// console.log(trainScheduler.time);
// console.log(trainScheduler.frequency);
// console.log(trainScheduler.minutes);

  // Output all of the new information into the relevant HTML sections
  // $("#name-display").text(trainScheduler.name);
  // $("#destination-display").text(trainScheduler.destination);
  // $("#train-time-display").text(trainScheduler.time);
  // $("#frequency-display").text(trainScheduler.frequency);
  // $("#minutes-away-display").text(trainScheduler.minutes);

  // Clear sessionStorage
  // sessionStorage.clear();

  // // Store all content into sessionStorage
  // sessionStorage.setItem("Train Name", trainScheduler.name);
  // sessionStorage.setItem("Destination", trainScheduler.destination);
  // sessionStorage.setItem("Train Time", trainScheduler.time);
  // sessionStorage.setItem("Frequency", trainScheduler.frequency);
  // sessionStorage.setItem("Minutes Away", trainScheduler.minutes);

  // By default display the content from sessionStorage
  // $("#name-display").text(sessionStorage.getItem("Train Name"));
  // $("#destination-display").text(sessionStorage.getItem("Destination"));
  // $("#train-time-display").text(sessionStorage.getItem("Train time"));
  // $("#frequency-display").text(sessionStorage.getItem("Frequency"));
  // $("#minutes-away-display").text(sessionStorage.getItem("Minutes Away"));
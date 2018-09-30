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
    // trainScheduler.minutes = $("#minutes-away-display").val().trim();
    
    database.ref().push(trainScheduler);
    clearForm()

});

function clearForm() {
    document.getElementById("trainForm").reset();
};


database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var newPost = childSnapshot.val();
    // Print the initial data to the console.
    console.log(newPost.name);
    trainNumber++;

    // First Time (pushed back 1 year to make sure it comes before current time)
    firstTimeConverted = moment(newPost.time, "MMMM Do YYYY, H HH").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("LTS"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % newPost.frequency;
    console.log(tRemainder);

    // Minute Until Train
    tMinutesTillTrain = newPost.frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    nextTrain = moment().add(tMinutesTillTrain, "minutes").format('LTS');
    // console.log("ARRIVAL TIME: " + moment(nextTrain));
    
    var newRow = $("<tr>").attr('data-num', trainNumber);
    var newTrainRow = $("<td class='name-display'>").text(newPost.name);
    var newDestinationRow = $("<td class='destination-display'>").text(newPost.destination);
    var newFrequencyRow = $("<td class='frequency-display'>").text(newPost.frequency);
    var newTimeRow = $("<td class='train-time-display'>").text(newPost.time);
    var newMinutesAwayRow = $("<td class='minutes-away-display'>").text(tMinutesTillTrain);

    newRow.append(newTrainRow, newDestinationRow, newFrequencyRow, newTimeRow, newMinutesAwayRow);

    $("tbody").append(newRow);
    

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    });
function displayTime () {
    var currentTime = moment().format('MMM Do YYYY, h:mm:ss a');
    $("#currentTime").text(currentTime);

    }
    setInterval(displayTime, 1000);

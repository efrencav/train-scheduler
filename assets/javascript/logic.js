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
    trainScheduler.frequency = $("#frequency").val().trim();
    trainScheduler.time = $("#time").val().trim();
    // trainScheduler.minutes = $("#minutes-away-display").val().trim();
    
    database.ref().push(trainScheduler);
    clearForm()

});

function clearForm() {
    document.getElementById("trainForm").reset();
};


database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot);
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var timeFirstTrain = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(timeFirstTrain);
    console.log(trainFrequency);

    var timeArray = timeFirstTrain.split(":");
    var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
    var maxMoment = moment().max(moment(), trainTime);
    var trainMinutes;
    var trainArrival;

    if (maxMoment === trainTime) {
        trainArrival = trainTime.format("hh:mm A");
        trainMinutes = trainTime.diff(moment(), "minutes");
    } else {

        var differenceTimes = moment().diff(trainTime, "minutes");
        var timeRemainder = differenceTimes % trainFrequency;
        trainMinutes = trainFrequency - timeRemainder;

        trainArrival = moment().add(trainMinutes, "m").format("hh:mm A");
    }
    trainNumber++;

    
    var newRow = $("<tr>").attr('data-num', trainNumber);
    var newTrainRow = $("<td class='name-display'>").text(trainName);
    var newDestinationRow = $("<td class='destination-display'>").text(trainDestination);
    var newFrequencyRow = $("<td class='frequency-display'>").text(trainFrequency);
    var newTimeRow = $("<td class='train-time-display'>").text(trainArrival);
    var newMinutesAwayRow = $("<td class='minutes-away-display'>").text(timeFirstTrain);

    newRow.append(newTrainRow, newDestinationRow, newFrequencyRow, newTimeRow, newMinutesAwayRow);

    $("tbody").append(newRow);
    

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    });
function displayTime () {
    var currentTime = moment().format('MMMM Do YYYY, h:mm a');
    $("#currentTime").text(currentTime);

    }
    setInterval(displayTime, 1000);


    // console.log(newPost.name);
    // trainNumber++;

    // // First Time (pushed back 1 year to make sure it comes before current time)
    // firstTimeConverted = moment(newPost.time, "MMMM Do YYYY, H HH").subtract(1, "years");
    // console.log(firstTimeConverted);

    // // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("LTS"));

    // // Difference between the times
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    // var timeRemainder = diffTime % newPost.frequency;
    // console.log(timeRemainder);

    // // Minute Until Train
    // trainMinutesTillTrain = newPost.frequency - timeRemainder;
    // console.log("MINUTES TILL TRAIN: " + trainMinutesTillTrain);

    // // Next Train
    // nextTrain = moment().add(trainMinutesTillTrain, "minutes").format('LTS');
    // // console.log("ARRIVAL TIME: " + moment(nextTrain));



// Initialize Firebase
var config = {
    apiKey: "AIzaSyA61znLMiETxwLYhoqhZxGEPX-m6b5QUE4",
    authDomain: "train-scheduler-902d4.firebaseapp.com",
    databaseURL: "https://train-scheduler-902d4.firebaseio.com",
    projectId: "train-scheduler-902d4",
    storageBucket: "",
    messagingSenderId: "594872294990"
  };
firebase.initializeApp(config);
  
// Global variables
var trainName = [];
var destination = [];
var firstTrainTime;
var frequency = 0;
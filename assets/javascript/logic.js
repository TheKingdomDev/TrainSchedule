  

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyByiRSEQtylEWkVQTh329mifF-JDlVwwAg",
    authDomain: "train-schedule-89d60.firebaseapp.com",
    databaseURL: "https://train-schedule-89d60.firebaseio.com",
    projectId: "train-schedule-89d60",
    storageBucket: "train-schedule-89d60.appspot.com",
    messagingSenderId: "743286417177"
  };
  firebase.initializeApp(config);


  //ref to database

  var database = firebase.database();

  var displayTime = moment().format('LT');

  $(".time").html("Current Time: " + displayTime);


  //add a new train

  $("#add-train").on("click", function() {

    event.preventDefault();

    train = $("#name-input").val().trim();
    dest = $("#dest-input").val().trim();
    firstT = $("#first-train").val().trim();
    freq = parseInt($("#freq-input").val().trim());

      //debug
      console.log(train);
      console.log(dest);
      console.log(firstT);
      console.log(freq);

    database.ref().push({
      train: train,
      dest: dest,
      firstT: firstT,
      freq: freq
    });

    $("#name-input").val("");  // clears form fields
    $("#dest-input").val("");
    $("#first-train").val("");
    $("#freq-input").val("");

    return false;



  });


  //function to pull from the database and add the input to the form

    database.ref().on("child_added", function(childSnapshot) {


    console.log(childSnapshot.val());

    var train = childSnapshot.val().train;
    var dest = childSnapshot.val().dest;
    var firstT = childSnapshot.val().firstT;
    var freq = parseInt(childSnapshot.val().freq);

    var firstTConverted = moment(firstT, "hh:mm").subtract(1, "years");
      console.log(firstTConverted); 
    var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    var diffTime = parseInt(moment().diff(moment(firstTConverted, "minutes")));
      console.log("DIFFERENCE IN TIME: " + diffTime);
      debugger;
    var tRemainder = diffTime % freq;
      console.log(parseInt(tRemainder));
    var minAway = freq - tRemainder;
      console.log("MINUTES TILL TRAIN: " + minAway);
    var next = moment().add(minAway, "minutes");
    var nextArrival = moment(next).format("hh:mm");


      console.log("ARRIVAL TIME: " + moment(next).format("hh:mm"));

        //train info
          console.log(train);
          console.log(dest);
          console.log(firstT);
          console.log(freq);
          console.log(minAway);
          console.log(nextArrival);


    $("#trainTable > tbody").append("<tr><td>"+ train + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");

    },  function (errorObject){
          console.log("The read failed" + errorObject.code);
  });


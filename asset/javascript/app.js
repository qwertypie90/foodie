    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAF-MUSzRXgnxDr9-vFsiGvk215i-_CJ1U",
        authDomain: "nadir-37f82.firebaseapp.com",
        databaseURL: "https://nadir-37f82.firebaseio.com",
        projectId: "nadir-37f82",
        storageBucket: "nadir-37f82.appspot.com",
        messagingSenderId: "78288137533"
    };

    firebase.initializeApp(config);
    var database = firebase.database();

$(document).ready(function() {
    $('[data-toggle=offcanvas]').click(function() {
        $('.row-offcanvas').toggleClass('active');

    });

    function addArticle(article) {
        database.ref('articles').push(article);
    }

    var articlesArr = [];
    database.ref('articles').on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            console.log(childSnapshot.val())
            console.log(childSnapshot.key)
            articlesArr.push(childSnapshot.val());

            $(".list-group").append("<div class='list-group-item list-group-item-action flex-column align-items-start'>" +
                childSnapshot.val().title +
                "<small>" + childSnapshot.val().date + "</small>" +
                "<p>" + childSnapshot.val().content + "</p>" +
                " </div>");
        })
    })

    // function displayArticle(article) {
        
          
    // }


    // $(".list-group-item").click(function() {
    // displayArticle();
    // }


});
$(document).ready(function() {

    $('#sidebarCollapse').on('click', function() {
        $('#sidebar').toggleClass('active');
    });


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


    function addArticle(article) {
        database.ref('articles').push(article);
    }

    database.ref('articles').on("value", function(snapshot) {
        var articlesArr = [];
        snapshot.forEach(function(childSnapshot) {
            console.log(childSnapshot.val())
            console.log(childSnapshot.key)
            articlesArr.push(childSnapshot.val());

        })
        console.log(articlesArr);

    })


    // var articles = [{
    //         title: 'Something',
    //         auth: 'as;fasfkjd',
    //         content: 'sdfsd;fsdjdafsfdjsa',
    //         date: 'May 4,49er9'
    //     },
    //     {
    //         title: 'Something',
    //         auth: 'as;fasfkjd',
    //         content: 'sdfsd;fsdjdafsfdjsa',
    //         date: 'May 4,49er9'
    //     },
    //     {
    //         title: 'Something',
    //         auth: 'as;fasfkjd',
    //         content: 'sdfsd;fsdjdafsfdjsa',
    //         date: 'May 4,49er9'
    //     },
    //     {
    //         title: 'Something',
    //         auth: 'as;fasfkjd',
    //         content: 'sdfsd;fsdjdafsfdjsa',
    //         date: 'May 4,49er9'
    //     }
    // ]


    function displayArticles(articleArr) {
        var content = $("#content")

        var listGroup = $("<div>")
        listGroup.addClass("list-group")

        for (var i = 0; i < articleArr.length; i++) {



            var article = $("<button>")

            var title = $("<h5>")


            var date = $("<small>")

            var shortDescription = $("<p>")



            article.addClass('list-group-item list-group-item-action flex-column align-items-start')
            article.append(title)
            article.append(date)
            article.append(shortDescription)
            listGroup.append(article)


        }


        // Retrive data from firebase
        $(".list-group").append("<div class=''list-group-item list-group-item-action flex-column align-items-start'>" + childSnapshot.val().title +
            childSnapshot.val().date + childSnapshot.val().author +
            childSnapshot.val().content + " </div>");
        content.html(listGroup)

    }



});
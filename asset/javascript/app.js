    // Initialize Firebase

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
    $(document).ready(function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');


      firebase.auth().onAuthStateChanged(function (user) {
        window.user = user
        $('#current-user').html(window.user.displayName)
        checkAuth()
      });


      $('#sign-in').click(function () {
        firebase.auth().signInWithPopup(provider).then(function (result) {
          // This gives you a Google Access Token.

          window.user = result
          console.log(result)


          checkAuth()

        }).catch(function (error) {
          console.log(error)
        })
      })


      $('#sign-out').click(function () {

        firebase.auth().signOut()
        checkAuth()


      })


      function checkAuth() {
        console.log(window.user)
        if (window.user) {


          $('#sign-in').hide()
          $('#sign-out').show()

        } else {
          $('#sign-in').show()
          $('#sign-out').hide()


        }

      }

      checkAuth()

      $('[data-toggle=offcanvas]').click(function () {
        $('.row-offcanvas').toggleClass('active');

      });

      function addArticle(article) {
        database.ref('articles').push(article);
      }

      var articlesArr = [];
      database.ref('articles').on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
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
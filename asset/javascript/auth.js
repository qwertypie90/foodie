  // var config = {
  //   apiKey: "AIzaSyAF-MUSzRXgnxDr9-vFsiGvk215i-_CJ1U",
  //   authDomain: "nadir-37f82.firebaseapp.com",
  //   databaseURL: "https://nadir-37f82.firebaseio.com",
  //   projectId: "nadir-37f82",
  //   storageBucket: "nadir-37f82.appspot.com",
  //   messagingSenderId: "78288137533"
  // };
  // firebase.initializeApp(config);



  //Google Auth Provider Using a popup.
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');


  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $('#sign-in').hide()
      $('#sign-out').show()
      $('#current-user').html(user.displayName)
      var imageURL = user.photoURL       
      $('#current-user').prepend($('<img>',{id:'profilePic', src: imageURL}))
        
     
      console.log(imageURL)


    } else {
      $('#sign-in').show()
      $('#sign-out').hide()
      $('#current-user').html("")
    }
  });

var userName;

  $('#sign-in').click(function () {
    firebase.auth().signInWithPopup(provider).then(function (result) {
      window.user = result;
      console.log(result)
      // lindsey here - just adding in a way to get the user's name so we can add it to the form automatically
      console.log(result.additionalUserInfo.profile.name)
      userName = result.additionalUserInfo.profile.name;
      $("#example-search-input").val(userName)
      checkAuth();
    }).catch(function (error) {
      console.log(error)
    })
  })


  $('#sign-out').click(function () {

    firebase.auth().signOut()



  })
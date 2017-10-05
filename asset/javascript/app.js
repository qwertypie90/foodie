$(document).ready(function () {
  $('[data-toggle=offcanvas]').click(function () {
    $('.row-offcanvas').toggleClass('active');
   
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

//Google Auth Provider Using a popup.

var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');


firebase.auth().onAuthStateChanged(function(user){
window.user = user
checkAuth()
});



$('#sign-in').click(function (){
  	firebase.auth().signInWithPopup(provider).then(function(result) {
		 // This gives you a Google Access Token.
     console.log(result)
     console.log (result.additionalUserInfo.profile.name)
		 window.user = result.user;
         
         checkAuth ()

								}).catch(function(error){
                  console.log (error)
                })
})
});

$('#sign-out').click(function(){

firebase.auth().signOut ()

})




function checkAuth (){
console.log(window.user)
  if (window.user){

 

    $('#sign-in').hide ()
    $('#sign-out').show ()

  } else {
    $('#sign-in').show ()
    $('#sign-out').hide ()

  }

}

checkAuth ()
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

 var view = 'articleList'

 $(document).ready(function() {


     function addArticle(article) {
         database.ref('articles').push(article);
     }

     function displayArticleList() {
         database.ref('articles').once("value", function(articlesSnapshot) {
             var listGroup = $('<div class="list-group">')
             articlesSnapshot.forEach(function(childSnapshot) {
                 // console.log(childSnapshot.val())
                 // console.log(childSnapshot.key)

                 //Show only the first sentence of "Content"
                 var content = childSnapshot.val().content;
                 splitContent = content.split(".")[0];
                 // console.log(splitContent);

                 var listGroupItem = $('<button class="list-group-item">')
                 listGroupItem.attr('data-articleId', childSnapshot.key)

                 var previewTitle = $('<h3>')
                 previewTitle.html(childSnapshot.val().title)

                 var previewAuthor = $('<p>')
                 previewAuthor.html(childSnapshot.val().author)

                 var previewDate = $('<p>')
                 previewDate.html(`<small>${childSnapshot.val().date}</small>`)

                 var previewText = $('<p>')
                 previewText.html(`${splitContent}...`)

                 listGroupItem.append(previewTitle).append(previewAuthor).append(previewDate).append(previewText)
                 listGroup.prepend(listGroupItem)
             })

             $('#content').html(listGroup)
         })
     }

     displayArticleList();

     // youtube API function
     function search(query, cb) {
         $.ajax({
             cache: false,
             data: $.extend({
                 key: 'AIzaSyCrAhV6_zQqKuURLfhF_xcXAhY73ydW2Ug',
                 q: query,
                 part: 'snippet',
                 type: 'video'
             }, { maxResults: 6 }),
             dataType: 'json',
             type: 'GET',
             timeout: 5000,
             url: 'https://www.googleapis.com/youtube/v3/search'
         }).done(function(data) {

             cb(data.items)
         })
     }


     function displayArticle(articleId) {
         database.ref(`articles/${articleId}`).once('value', function(snapshot) {
             var article = $('<div>')

             var articleTitle = $('<h3>')
             articleTitle.html(snapshot.val().title)

             var articleAuthor = $('<p>')
             articleAuthor.html(snapshot.val().author)

             var articleDate = $('<p>')
             articleDate.html(`<small>${snapshot.val().date}</small>`)

             var converter = new showdown.Converter()

             var html = converter.makeHtml(snapshot.val().content);

             var articleText = $('<p>')
             articleText.html(html)

             var gallery = $('<div class="vids">')

             // article.append(buttonBack)
             // article.append(`<pre>${JSON.stringify(snapshot.val(), null, 2)}</pre>`)
             article.append(articleTitle).append(articleAuthor).append(articleDate).append(articleText)

             $('#content').html(article)
             $('form').hide()

             article.append(gallery)

             search(snapshot.val().title, function(data) {
                 // console.log(data)

                 //loop through the videos under the article
                 for (var i = 0; i < data.length; i++) {
                     // console.log(data[i].snippet.title)
                     var vidDiv = $("<div>");
                     var vidTitle = $('<p class="title">').text(data[i].snippet.title);
                     // Creating and storing an image tag
                     var vidImage = $('<img style="cursor:pointer">');
                     vidImage.addClass("video-pic");
                     vidImage.attr("src", data[i].snippet.thumbnails.default.url);
                     // console.log(results.items[i].snippet.title);
                     var results = data[i].snippet.title;
                     var id = data[i].id.videoId;
                     var URL = "https://www.youtube.com/watch?v=" + id
                     var vidTitle = $('<p class="title">').text(data[i].snippet.title);

                     vidDiv.append(vidImage);
                     vidDiv.append(vidTitle);
                     $(".vids").prepend(vidDiv);

                     var videoPic = $(".video-pic")
                     videoPic.on("click", function() {
                         event.preventDefault();
                         window.open(URL);
                     })
                 }
                 // console.log(data[0].snippet.title)

             })


         })
     }

     $('#content').on("click", ".list-group-item", function() {
        $('#submitB').hide();
         var articleId = $(this).attr('data-articleId')
         view = "fullArticle"
         displayArticle(articleId);
         var title = $(this).attr('data-articleId')

         var buttonBack = $('<button class="btn btn-info navbar-btns">')
         buttonBack.html('Back')
         buttonBack.click(function() {
             displayArticleList()
             $(this).hide();
         })



         $('#left').append(buttonBack);
         console.log("HELLO")
     });

     // ADDING ARTICLE TO FIREBASE
     $(".submit").on("click", function(event) {
         console.log("button pressed");
         event.preventDefault();
         var nTitle = $("#example-text-input").val().trim();
         // console.log(nTitle);

         // Adding celeb from the textbox to our array
         var nAuthor = $("#example-search-input").val().trim();
         // console.log(nAuthor);
         // Adding celeb from the textbox to our array
         var nMoment = moment().format('MMMM Do YYYY, h:mm:ss a')
         // console.log(nMoment);
         // Adding celeb from the textbox to our array
         var nContent = $("#exampleTextarea").val().trim();
         // console.log(nContent);

         var article = {
             title: nTitle,
             author: nAuthor,
             date: nMoment,
             content: nContent
         };

         // console.log(article);

         $("#example-text-input").val("");
         $("#exampleTextarea").val("");

         function addArticle() {
             database.ref('/articles').push(article);
             displayArticleList();
         }

         addArticle();
     })


     $("#sidebarCollapse").on("click", function(event) {
         document.getElementById('sidebar').style.width = "30%";
         document.getElementById('darkBackground').style.display="block";
     })

     $("#darkBackground").on("click", function(event) { 
        document.getElementById('sidebar').style.width = "0px";
         document.getElementById('darkBackground').style.display="none";
        console.log("hi")
     })


 });
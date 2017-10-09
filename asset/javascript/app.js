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

    var query = ''

    var view = 'articleList'

    $(document).ready(function() {
        $('[data-toggle=offcanvas]').click(function() {
            $('.row-offcanvas').toggleClass('active');

        });

        function addArticle(article) {
            database.ref('articles').push(article);
        }

        function displayArticleList() {
            database.ref('articles').once("value", function(articlesSnapshot) {
                var listGroup = $('<div class="list-group">')
                articlesSnapshot.forEach(function(childSnapshot) {

                    var content = childSnapshot.val().content;
                    splitContent = content.split(".")[0];
                    // console.log(splitContent);
                    var listGroupItem = $('<div class="list-group-item">')
                    listGroupItem.attr('data-articleId', childSnapshot.key)
                    var title = $('<p>')
                    title.html(childSnapshot.val().title)
                    var contentDate = $('<p>')
                    contentDate.html(`<small>${childSnapshot.val().date}</small>`)
                    var contentText = $('<p>')
                    contentText.html(`${splitContent}...`)

                    listGroupItem.append(title).append(contentDate).append(contentText)
                    listGroup.append(listGroupItem)
                })

                $('#content').html(listGroup)
            })
        }

        displayArticleList()

        function displayArticle(articleId) {
            database.ref(`articles/${articleId}`).once('value', function(snapshot) {
                var article = $('<div>')
                var button = $('<button>')
                button.html('Back')
                article.append(button)
                article.append(`<pre>${JSON.stringify(snapshot.val(), null, 2)}</pre>`)
                $('#content').html(article)
                var gallery = $("<div>");
                gallery.addClass("vids");
                article.append(gallery);
                $('.vids').css({ "background-color": "red", "height": "100%" });

                var query = snapshot.val().title;
                onClientLoad();

                button.click(function() {
                    displayArticleList()
                })

                function onClientLoad() {
                    // console.log('--begin')
                    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
                }

                // Called automatically when JavaScript client library is loaded.

                // second function
                // Called automatically when YouTube API interface is loaded (see line 9).
                function onYouTubeApiLoad() {
                    // This API key is intended for use only in this lesson.
                    // See https://goo.gl/PdPA1 to get a key for your own applications.
                    // console.log('--setting api key');
                    gapi.client.setApiKey('AIzaSyCrAhV6_zQqKuURLfhF_xcXAhY73ydW2Ug');
                    search();
                }


                // third function
                function search() {
                    // Use the JavaScript client library to create a search.list() API call.
                    var request = gapi.client.youtube.search.list({
                        part: 'snippet',
                        part: 'snippet',
                        q: query,
                        maxResults: '5',
                        type: 'video'
                    });

                    // console.log('----searching');
                    // Send the request to the API server,
                    // and invoke onSearchRepsonse() with the response.
                    request.execute(onSearchResponse);
                }

                // fourth function
                // Called automatically with the response of the YouTube API request.
                function onSearchResponse(response) {
                    // console.log('call show response fn');
                    showResponse(response);
                }

                // fifth function
                // Helper function to display JavaScript value on HTML page.
                function showResponse(response) {
                    var responseString = JSON.stringify(response, '', 2);
                    // console.info(responseString)
                    var results = response;
                    // console.log(results)
                    for (var i = 0; i < results.items.length; i++) {
                        var vidImage = $("<img>");
                        vidImage.addClass("videoPic");
                        $(vidImage).attr("src", results.items[i].snippet.thumbnails.default.url);
                        // console.log(results.items[i].snippet.title);
                        var rezults = results.items[i].snippet.title;
                        var id = results.items[i].id.videoId;
                        var URL = "https://www.youtube.com/watch?v=" + id
                        var P = $("<p>").text("Title: " + results.items[i].snippet.title);
                        $('.vids').append(vidImage);
                        $('.vids').append(P);
                        $(".videoPic").on("click", function() {
                            event.preventDefault();
                            window.open(URL);
                        })

                    }
                }
            })

        }

        $('#content').on("click", ".list-group-item", function() {
            var articleId = $(this).attr('data-articleId')
            view = "fullArticle"
            displayArticle(articleId);


        });

    });
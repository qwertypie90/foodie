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
                    // console.log(childSnapshot.val())
                    // console.log(childSnapshot.key)

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
                button.click(function(){
                    displayArticleList()
                })
                article.append(button)
                article.append(`<pre>${JSON.stringify(snapshot.val(), null, 2)}</pre>`)


                $('#content').html(article)
            })

        }


        $('#content').on("click", ".list-group-item", function() {
            var articleId = $(this).attr('data-articleId')
            view = "fullArticle"
            displayArticle(articleId);

        });

    });
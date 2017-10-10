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

                    //Show only the first sentence of "Content"
                    var content = childSnapshot.val().content;
                    splitContent = content.split(".")[0];
                    console.log(splitContent);

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
                    listGroup.append(listGroupItem)
                })

                $('#content').html(listGroup)
            })
        }

        displayArticleList()

        function displayArticle(articleId) {
            database.ref(`articles/${articleId}`).once('value', function(snapshot) {
                var article = $('<div>')
                var buttonBack = $('<button class="btn btn-outline-info">')
                buttonBack.html('Back')
                buttonBack.click(function() {
                    displayArticleList()
                })

                var articleTitle = $('<h3>')
                articleTitle.html(snapshot.val().title)

                var articleAuthor = $('<p>')
                articleAuthor.html(snapshot.val().author)

                var articleDate = $('<p>')
                articleDate.html(`<small>${snapshot.val().date}</small>`)

                var articleText = $('<p>')
                articleText.html(snapshot.val().content)

                article.append(buttonBack)
                // article.append(`<pre>${JSON.stringify(snapshot.val(), null, 2)}</pre>`)
                article.append(articleTitle).append(articleAuthor).append(articleDate).append(articleText)

                $('#content').html(article)
            })

        }

        $('#content').on("click", ".list-group-item", function() {
            var articleId = $(this).attr('data-articleId')
            view = "fullArticle"
            displayArticle(articleId);

        });

    });
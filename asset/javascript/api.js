
// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    console.info(responseString)
    $(".container").html(responseString);

}

// Called automatically when JavaScript client library is loaded.


// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See https://goo.gl/PdPA1 to get a key for your own applications.
    console.log('--setting api key');
    gapi.client.setApiKey('AIzaSyCrAhV6_zQqKuURLfhF_xcXAhY73ydW2Ug');
    search();
}

// first function
function onClientLoad() {
    console.log('--begin')
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function search() {
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: 'lohan'
    });
    
    console.log('----searching');
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);

}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    console.log('call show response fn');
    showResponse(response);
}
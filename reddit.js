var request = require('request');

/*
This function should "return" the default homepage posts as an array of objects
*/
function getHomepage(callback) {
  request("https://www.reddit.com/.json", function (error, result) {
    if (error) {
        callback(error);
    } else {
      if(result.body){
        var resultObject = JSON.parse(result.body);
        var arrOfHomepagePosts = resultObject.data.children;
        callback(arrOfHomepagePosts);
      } else {
        callback("There is an error: " + error);
      }
    }
  });
}
// Load reddit.com/.json and call back with the array of posts

//getHomepage(console.log);

/*
This function should "return" the default homepage posts as an array of objects.
In contrast to the `getHomepage` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedHomepage(sortingMethod, callback) {
  var address = "https://www.reddit.com/" + sortingMethod + ".json";
  request(address, function (error, result) {
    var resultObject = JSON.parse(result.body);
    if (resultObject[0].data) {
        callback("It's not a valid sorting method.");
    } else {
      var arrOfSortedHomepagePosts = resultObject.data.children;
      callback(arrOfSortedHomepagePosts);
    } 
  });
}
  // Load reddit.com/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods

//getSortedHomepage("contl", console.log);

/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
*/
function getSubreddit(subreddit, callback) {
  var address = "https://www.reddit.com/r/" + subreddit + ".json";
  request(address, function (error, result) {
    var resultObject = JSON.parse(result.body);
    if (!resultObject.data.children[0]) {
        callback("It's not a valid subreddit.");
    } else {
      var arrOfSubreddit = resultObject.data.children;
      callback(arrOfSubreddit);
    } 
  });
}
  // Load reddit.com/r/{subreddit}.json and call back with the array of posts
//getSubreddit("montreal", console.log);

/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
In contrast to the `getSubreddit` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedSubreddit(subreddit, sortingMethod, callback) {
  var address = "https://www.reddit.com/r/" + subreddit + "/" + sortingMethod + ".json";
  request(address, function (error, result) {
    var resultObject = JSON.parse(result.body);
    if (resultObject.error || !resultObject.data.children[0]) {
        callback("It's not a valid subreddit and/or it's not a valid sorting method.");
    } else {
      var arrOfSOrtedSubreddit = resultObject.data.children;
      callback(arrOfSOrtedSubreddit);
    } 
  });
}
  // Load reddit.com/r/{subreddit}/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
//getSortedSubreddit("moreal", "contrersial", console.log)

/*
This function should "return" all the popular subreddits
*/
function getSubreddits(callback) {
  var address = "https://www.reddit.com/subreddits.json";
  request(address, function (error, result) {
    var resultObject = JSON.parse(result.body);
    if (resultObject.error) {
        callback("Ups...An error has occured");
    } else {
      var arrOfPopularSubreddits = resultObject.data.children;
      callback(arrOfPopularSubreddits);
    } 
  });
}
  
  // Load reddit.com/subreddits.json and call back with an array of subreddits

//getSubreddits(console.log);

// Export the API
module.exports = {
  getHomepage: getHomepage,
  getSortedHomepage: getSortedHomepage,
  getSubreddit: getSubreddit,
  getSortedSubreddit: getSortedSubreddit,
  getSubreddits
};

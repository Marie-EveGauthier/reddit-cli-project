var inquirer = require('inquirer');
var reddit = require("./reddit");

//Function to expand on Objects within the console.log
function betterLog(value) {
  console.log(require('util').inspect(value, {
    depth: 20,
    colors: true
  }));
}

//Choices of main menu
var menuChoices = [{
  name: 'Show homepage',
  value: 'HOMEPAGE'
}, 
{
  name: 'Show subreddit',
  value: 'SUBREDDIT'
}, 
{
  name: 'List subreddits',
  value: 'SUBREDDITS'
}];

//Main menu
function ask() {
  inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: 'What do you want to do?',
    choices: menuChoices
  }).then(
    function(answers) {
      choose(answers);
    });
}
ask();

//Handle the three choices of the main menu      
function choose(answers) {
  switch (answers.menu) {
    case 'HOMEPAGE':
        reddit.getHomepage(function(posts) {
          infoForEachPost(posts);
          ask();
        });
      break;



    case 'SUBREDDIT':
      inquirer.prompt({
        type: 'input',
        name: 'subreddit',
        message: 'Which subreddit do you want to read?'
      }).then(
        function(answerSub) {

          reddit.getSubreddit(answerSub.subreddit, function(res) {
            if (res === "It's not a valid subreddit.") {
              console.log(res);
              ask();
            }
            else {
              infoForEachPost(res);
              ask();
            }
          });
        });
      break;
  }
}

//Display only the title, url, votes and author of each post
function infoForEachPost(arr) {
  betterLog(arr.map(function(post) {
    return {
      title: post.data.title,
      url: post.data.url,
      votes: post.data.score,
      author: post.data.author
    };
  }));
}

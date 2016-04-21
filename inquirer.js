var inquirer = require('inquirer');
var reddit = require("./reddit");

var menuChoices = [
  {name: 'Show homepage', value: 'HOMEPAGE'},
  {name: 'Show subreddit', value: 'SUBREDDIT'},
  {name: 'List subreddits', value: 'SUBREDDITS'}
];

inquirer.prompt({
  type: 'list',
  name: 'menu',
  message: 'What do you want to do?',
  choices: menuChoices
}).then(
  function(answers) {
    if(answers.menu === 'HOMEPAGE') {
      reddit.getHomepage(function(posts){
        
        infoForEachPost(posts);
      });
    }
  }
);


function infoForEachPost(arr) {
  console.log(arr.map(function(post){
    return {title: post.data.title, 
    url: post.data.url, 
    votes: post.data.score, author: post.data.author};
  }));
}


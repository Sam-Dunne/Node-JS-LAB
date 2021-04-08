const fs = require('fs');
const path = require('path');
const rp = require('request-promise');

const redditArticlesPath = path.join(__dirname, 'popular-articles.json');

rp('https://www.reddit.com/r/popular.json')
    .then(posts => {
        // assigns variable to convert JSON string to a *JavaScript* object
        const topPosts = JSON.parse(posts);
        // returns an array of *JavaScript* objects with keys (title,author,id) with corresponding values from URL's parsed data
        const scrapePostsArray = topPosts.data.children.map(post => {
            return { title: post.data.title, author: post.data.author, id: post.data.id }
        });

        // writes to file system via joined path, converts scrapePostsArray JS object back to a JSON string, adds error handler
        fs.writeFile(redditArticlesPath, JSON.stringify(scrapePostsArray, null, 2), (err) => {
            if(err) {
                console.log(err)
                return
            }
            console.log('write complete')
        });
    });





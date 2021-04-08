const fs = require('fs');
const path = require('path');
const rp = require('request-promise');

// rp is a node version of fetch. 
//requests data from Reddit popular API
rp('https://www.reddit.com/r/popular.json')
    .then(rawJSON => {
        // assigns variable to convert JSON string to a *JavaScript* object
        const set = JSON.parse(rawJSON);
        // loops through all posts getting id data and the url of only the posts whose url extension matches filter
        set.data.children.forEach(post => {
            const id = post.data.id
            const extension = path.extname(post.data.url);
            if (
                extension === '.png' ||
                extension === '.gif' ||
                extension === '.jpg'
            ) {
                // encodes filtered url's with base64
                rp(post.data.url, { encoding: 'base64' }).then(media => {
                    // writes file to 'downloads' local directory 
                    fs.writeFile(path.join(__dirname, `./downloads/${id}${extension}`), media, { encoding: 'base64' }, (err) => {
                        if (err) {
                            console.log(err)
                            return;
                        }
                        console.log('write complete');
                    })
                });
            }
        });
    })
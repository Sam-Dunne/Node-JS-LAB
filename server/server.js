const fs = require('fs');
const path = require('path');

const pathChirps = path.join(__dirname, '../chirps.json');

fs.readFile(pathChirps, (err, data) => {
    if (err) {
        console.log(err)
        return;
    }
    // assigns variable to convert JSON string to a *JavaScript* object
    const chirps = JSON.parse(data);
    // adds new chirp object to 'chirps.json'
    chirps.push({name: 'JOe', msg:'jkfdl;sa'})
    // logs updated array
    // console.log(chirps)

    // writes updated array to file as a JSON string
    fs.writeFile(pathChirps, JSON.stringify(chirps, null, 2), (err) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log('Write complete')
    })
})
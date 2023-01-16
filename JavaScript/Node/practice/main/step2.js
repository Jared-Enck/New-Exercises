const { default: axios } = require('axios');
const fs = require('fs');
const argv = process.argv;

cat = (path) => {
    fs.readFile(path, 'utf8', (err,data) => {
        if (err) {
            console.error(err)
            process.kill(1)
        }
        console.log(data)
    })
}

async function webCat(url) {
    try {
        const { data } = await axios.get(url)
        console.log(data)
    }
    catch (err) {
        let msg = `Error fetching ${url}`
        console.log(msg)
        console.log(`Request failed with status code ${err.response.status}`)
    }
}

if (argv[2].includes('http')) {
    webCat(argv[2])
} else {
    cat(argv[2])    
}
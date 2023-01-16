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
        console.error(`Error fetching ${url}: ${err}`)
        process.exit(1)
    }
}

if (argv[2].includes('http')) {
    webCat(argv[2])
} else {
    cat(argv[2])    
}
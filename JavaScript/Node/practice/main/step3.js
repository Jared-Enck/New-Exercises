const { default: axios } = require('axios');
const fs = require('fs');
const argv = process.argv;

handleOutput = (text, out) => {
    if (out) {
      fs.writeFile(out, text, 'utf8', err => {
        if (err) {
          console.error(`Couldn't write ${out}: ${err}`);
          process.exit(1);
        }
      });
    } else {
      console.log(text);
    }
  }

cat = (path, out) => {
    fs.readFile(path, 'utf8', (err,data) => {
        if (err) {
            console.error(`Error reading ${path}: ${err}`)
            process.exit(1)
        }
        handleOutput(data, out)
    })
}

async function webCat(url, out) {
    try {
        const { data } = await axios.get(url)
        handleOutput(data, out)
    }
    catch (err) {
        console.error(`Error fetching ${url}: ${err}`)
        process.exit(1)
    }
}

let path
let out

if (argv[2] === '--out') {
    out = argv[3]
    path = argv[4]
} else {
    path = argv[2]
}

if (path.includes('http')) {
    webCat(path, out);
  } else {
    cat(path, out);
  }
const fs = require('fs')
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

if (argv[2]) {
    cat(argv[2])
}
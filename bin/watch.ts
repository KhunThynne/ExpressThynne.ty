
const path = require('path');
const fs = require('fs');

const filesToWatch = ['www.ts', 'www.js'];

async function Watch() {
    let watch = false;

    const checkFiles = filesToWatch.map(file => {
        const filePath = path.join(__dirname, file);

        return new Promise((resolve: any, reject) => {
            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (err) {
                    // console.error(`File ${filePath} does not exist`);
                    resolve(); // Resolve even if file doesn't exist to continue checking others
                } else {
                    // console.log(`Watching for changes in ${filePath}`);
                    fs.watch(filePath, (eventType, filename) => {

                        if (eventType === "change") {
                            watch = true;
                        }
                        resolve();
                    });
                }
            });
        });
    });
    console.log(watch)
    await Promise.all(checkFiles);
    return watch;
}


export default Watch
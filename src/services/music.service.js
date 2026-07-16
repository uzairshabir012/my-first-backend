const { ImageKit } = require('@imagekit/nodejs');


const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})



async function uploadFile(file) {
    try {
        const result = await imagekit.files.upload({
            file,
            fileName: `music_${Date.now()}`,
            folder: "spotify-clone/music"
        });

        return result;
    }

    catch (err) {
        console.log("File Upload Error!")
    }
}

module.exports = uploadFile;
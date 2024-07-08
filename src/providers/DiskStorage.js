const fs = require('fs');
const path = require('path');
const uploadConfig = require('../configs/upload');

class DiskStorage{
    async saveFile(filename){ 
        // move file from TMP FOLDER to UPLOAD FOLDER
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, filename), 
            path.resolve(uploadConfig.UPLOADS_FOLDER, filename)
        );

        return filename;
    }

    async deleteFile(file){
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

        try {
            await fs.promises.stat(filePath);
        } catch (error) {
            return;
        }

        await fs.promises.unlink(filePath);
    }
}

module.exports = new DiskStorage();

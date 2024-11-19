const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const multer = require('multer');
dotenv.config({ path: `.env.local`, override: true });

const upload = multer(); // Initialize multer for handling multipart form data

function getFileExtension(mimeType) {
    const mimeToExt = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/gif': '.gif',
        'application/json': '.json',
        'video/mp4':'.mp4'
    };
    return mimeToExt[mimeType] || ''; // Default to empty string if mimetype not recognized
}

async function upLoadToS3(data, fileName, extension) {
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET;
    //const contentType=getFileExtension(extension);
      console.log(extension)
    const s3Bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
    });

    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: data, // Ensure data is in correct binary format for images
        ContentType: extension, // Use the appropriate ContentType
        ACL: 'public-read',
        // ContentDisposition: 'attachment'
        ContentDisposition:'inline'
    };

    return new Promise((resolve, reject) => {
        s3Bucket.upload(params, (err, s3Response) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(s3Response);
                resolve({location:s3Response.Location,mimeType:extension});
            }
        });
    });
}

addDocuments = async (req, res, next) => {
    try {
        // Use `req.file` provided by multer to access the uploaded file
        const files = req.files;
        console.log(req.files)
        if (!files) {
            return res.status(400).send('No file uploaded.');
        }

        
        // Upload the file with the correct content type and body
        const uploadingFiles=files.map((file)=>{
            const contentType = file.mimetype;
            const fileName = `groupchat${req.user.id}_${file.originalname}`;
            const buffer=file.buffer

           return  upLoadToS3(buffer,fileName,file.mimetype)
        }
        )
        const results=await Promise.all(uploadingFiles)
       console.log(results)
        const locations=results.map((result)=> {
            const data={
                location:result.location,
                mimeType:result.mimeType
            }

            return data
        })
        console.log(locations)
       req.locations=locations
        return next()
    } catch (error) {
        console.error("Error in addDocuments:", error);
        res.status(500).send('Error uploading file');
    }
};

module.exports = { 
    addDocuments: [upload.array('files'), addDocuments] // Use multer to handle file upload before `addDocuments`
};

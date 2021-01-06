const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../../../config/secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET
});

exports.upload = (req, res, next) => {
    if (!req.file) {
        return res.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;
    s3.putObject({
        Bucket: "coriander-finalproject",
        ACL: "public-read",
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size
    })
        .promise()
        .then(() => {
            // it worked!!!
            next();
        })
        .catch(err => {
            // uh oh
            console.log(err);
            res.sendStatus(500);
        });
};

/* The following example deletes an object from an S3 bucket. */
exports.delete = (req, res, next) => {
    const { url } = req.body;
    s3.deleteObject({
        Bucket: "coriander-finalproject",
        Key: url
    })
        .promise()
        .then(() => {
            next();
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
};

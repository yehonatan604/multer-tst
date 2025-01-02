import fs from "fs";
import multer from "multer";

const dest = multer.diskStorage({
    destination: async (req, _, callback) => {
        let requestedPath = req.params.path;
        const id = req.user.companyId;
        const path = `files/uploaded/${id}/${requestedPath}`;
        fs.mkdirSync(path, { recursive: true });
        callback(null, path);
    },
    filename: async (_, file, callback) => {
        const normalizedFilename = Buffer.from(
            file.originalname,
            "latin1"
        ).toString("utf8");

        callback(null, normalizedFilename);
    },
});

const upload = multer({
    storage: dest,
    limits: { fileSize: 1000000 },
    fileFilter: (_, file, callback) => {
        const normalizedFilename = Buffer.from(
            file.originalname,
            "latin1"
        ).toString("utf8");

        if (!normalizedFilename.match(/\.(pdf|docx|doc|png|jpg|jpeg)$/)) {
            return callback(
                new Error("Please upload a PDF, Word document or an image")
            );
        }
        callback(null, true);
    },
});

export const uploadFile = upload.single("file");
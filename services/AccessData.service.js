import fs from "fs";
import path from "path";

const getFile = async (companyId, dirPath, fileName) => {
    try {
        const filePath = path.join("files", "uploaded", companyId, dirPath, fileName);

        if (!fs.existsSync(filePath)) {
            return null;
        }

        const fileData = fs.readFileSync(filePath);
        const base64Data = fileData.toString("base64");

        const ext = path.extname(fileName).toLowerCase();
        const mimeType = {
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
            ".gif": "image/gif",
            ".pdf": "application/pdf",
            ".doc": "application/msword",
            ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        }[ext] || "application/octet-stream";

        return `data:${mimeType};base64,${base64Data}`;
    } catch (error) {
        throw new Error("File not found", 404);
    }
};

export { getFile };

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime-types";

const bucketName = "shopative-dashboard";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const form = new multiparty.Form();
    const { fields, files }: { fields: any; files: any } = await new Promise(
      (resolve, rejects) => {
        form.parse(req, (err, fields, files) => {
          if (err) rejects(err);
          resolve({ fields, files });
        });
      }
    );

    const client = new S3Client({
      region: "ap-southeast-2",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || "",
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
      },
    });

    const links: string[] = [];
    for (const file of files.files) {
      const ext = file.originalFilename.split(".").pop();
      const newFileName = `${Date.now()}.${ext}`;
      await client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: newFileName,
          Body: fs.readFileSync(file.path),
          ACL: "public-read",
          ContentType: mime.lookup(file.path) || "application/octet-stream",
        })
      );
      const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
      links.push(link);
    }
    res.json({
      links,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

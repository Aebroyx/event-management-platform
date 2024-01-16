import { Request, Response, NextFunction } from "express";
import { upload } from "../lib/multer";

import fs from 'fs';

export const uploadValidator = (req: Request, res: Response, next: NextFunction) => {
    const uploadResult = upload.fields([{name: 'uploadImg', maxCount: 3}])

    uploadResult(req, res, (err) => {
        try {
            if(err) throw err

            let isError = ''

            if (req.files) {
                const filesArray = Array.isArray(req.files) ? req.files : req.files['uploadImg'];
              
                if (Array.isArray(filesArray)) {
                  filesArray.forEach((item: Express.Multer.File) => {
                    console.log(item);
                    if (item.size > 5000000) {
                      isError += `${item.originalname} Size too Large. Maximum Size 5Mb`;
                    }
                  });
                }
              }

            if(isError) throw {message: isError, images: req.files}
            next()
        } catch (error: any) {
            if(error.images.uploadImg){
              error.images.uploadImg.forEach((item: any) => {
                fs.rmSync(item.path)
              })
            }

            res.status(500).send({
                error: true, 
                message: `Upload Failed! ${error.message}`, 
                data: null
            })
        }
    })
}
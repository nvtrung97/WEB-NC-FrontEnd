import {v2} from 'cloudinary';

    uploadCloudinary: async (Base64) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_APIKEY,
            api_secret: process.env.CLOUDINARY_APISECRET
        });
        return new Promise((resole) => {
            cloudinary.uploader.upload(`data:image/png;base64,${Base64}`, (error, result) => {
                if (error) return -1 ;
                return resole(result);
            });
        })
    },
    uploadCloudinaryImageUrl: async (url) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_APIKEY,
            api_secret: process.env.CLOUDINARY_APISECRET
        });
        return new Promise((resole) => {
            cloudinary.uploader.upload(url, (error, result) => {
                if (error) return -1 ;
                return resole(result);
            });
        })
    }

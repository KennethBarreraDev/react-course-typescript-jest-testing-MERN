import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "@/cloudinary/cloudinaryProvider";

cloudinary.config({
    cloud_name: 'YOUR_CLOUD_NAME',
    api_key: 'YOUR_API_KEY',
    api_secret: 'YOUR_API_KEY',
    secure: true
})

describe('cloudinaryProvider.test.ts', () => {
    test('Should upload file correctly to cloudinary', async () => {
        const imageUrl = 'https://icons.iconarchive.com/icons/icons8/ios7/256/Science-Test-Tube-icon.png';
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'img.png', { type: 'image/png' });
        
        console.log(file); 
        
        expect(typeof imageUrl).toBe('string');

        try {
            const fileUploadResponse = await fileUpload(file);
            expect(fileUploadResponse.status).toBe(true);
            const segments: string[] = imageUrl.split('/');
            const imageId = segments[segments.length-1].replace('png', '');
            cloudinary.api.delete_resources([imageId]);

        } catch (error: any) {
        }
    });


    test('Should return false when image is not upload', async () => {
        const imageUrl = 'https://icons.iconarchive.com/icons/icons8/ios7/256/Science-Test-Tube-icon';
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'img.png', { type: 'image/png' });

        try {
            const fileUploadResponse = await fileUpload(file);
            expect(fileUploadResponse.status).toBe(false);
        } catch (error: any) {
            console.error('Error al subir archivo:', error.response?.data || error.message);
        }
    });



});

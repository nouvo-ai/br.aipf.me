const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const { ACCESS_KEY_ID } = process.env;
    const { SECRET_ACCESS_KEY } = process.env;
    const { S3_REGION } = process.env;
    const { BUCKET_NAME } = process.env;

    AWS.config.update({
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
        region: S3_REGION
    });

    const s3 = new AWS.S3();

    const file = event.body; // 클라이언트에서 전달된 파일 데이터

    if (!file) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: '파일을 선택해주세요.' })
        };
    }

    const params = {
        Bucket: BUCKET_NAME,
        Key: file.name,
        Body: file
    };

    try {
        const data = await s3.upload(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: '이미지 업로드 성공', location: data.Location })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: '이미지 업로드 실패', error: error.message })
        };
    }
};
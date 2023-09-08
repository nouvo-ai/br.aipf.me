exports.handler = async (event, context) => {
    const { S3_REGION } = process.env;
    return {
        statusCode: 200,
        body: JSON.stringify({ message: `S3_REGION: ${S3_REGION}` }),
    };
};
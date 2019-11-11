module.exports = async function (context, req) {
    context.log('createTweet was triggered.');

    const userTable = context.bindings.userTable; // Get to ensure it's found.

    const tweetUsername = req.query.username || req.body.username;
    const tweetContent = req.query.message || req.body.message;
    const fileName = req.query.fileName || req.body.fileName;
    const fileData = req.query.fileData || req.body.fileData;

    // If the user exists.
    if(userTable){
        var timestamp = new Date().getTime(); // Crude UUID-like thing
        var tweetData = {
            PartitionKey: "part",
            RowKey: timestamp,
            username: tweetUsername,
            message: tweetContent,
            fileName: fileName,
            fileData: fileData
        }

        context.bindings.tweetTable = tweetData;

        context.res = {
            status: 200,
            body: {
                timestamp: new Date().getTime(), // Crude UUID-like thing
                username: tweetUsername,
                message: tweetContent
            }
        }
    }else{
        context.res = {
            status: 400,
            body: {}
        }
    }
};
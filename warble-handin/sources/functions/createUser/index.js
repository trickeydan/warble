module.exports = async function (context, req) {
    context.log('createTweet was triggered.');

    const userInTable = context.bindings.userInTable; // Get to ensure it's not taken.

    const username = req.query.username || req.body.username;
    const name = req.query.name || req.body.name;

    // Check if the user already exists
    if(userInTable){
        context.res = {
            status: 400,
            body: {status: "Username taken."}
        }
    }else{
        var userData = {
                PartitionKey: "part",
                RowKey: username,
                name: name
            }

            context.bindings.userOutTable = userData;

            context.res = {
                status: 200,
                body: {
                    username: username,
                    name: name
                }
            }
    }
};
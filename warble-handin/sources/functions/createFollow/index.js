module.exports = async function (context, req) {
    context.log('createFollow was triggered.');

    const userInTable = context.bindings.userInTable; // Get to ensure it exists.
    const followsInTable = context.bindings.followsInTable; // Get to ensure it exists.
    const existsInTable = context.bindings.existsInTable; // Get to ensure it does not exist.

    const username = req.query.username || req.body.username;
    const follows = req.query.follows || req.body.follows;

    // Check that both users exist
    if(userInTable && followsInTable){

        // Check to see if the follow relationship already exists.
        if(existsInTable && existsInTable.length > 0){
            context.res = {
                status: 400,
                body: {status: "Already following."}
            }
        }else{
            
            // Check that the usernames are not the same.
            if(username === follows){
                context.res = {
                    status: 400,
                    body: {status: "Cannot follow same user."}
                }
            }else{
                // Create the data to add to the follows table.
                var timestamp = new Date().getTime(); // Crude UUID-like thing
                var followersData = {
                    PartitionKey: "part",
                    RowKey: timestamp,
                    username: username,
                    follows: follows
                }

                context.bindings.followersOutTable = followersData;
                context.res = {
                    status: 201,
                    body: {
                        username: username,
                        follows: follows
                    }
                }
            }
        }
    }else{
        context.res = {
            status: 400,
            body: {status: "Invalid username."}
        }
    }
};
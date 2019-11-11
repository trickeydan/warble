module.exports = async function (context, req) {
    context.log('getFeed was triggered.');

    const tweetTable = context.bindings.tweetTable;
    const followingTable = context.bindings.followingTable;
    const username = req.query.username || req.body.username;

    var results = []

    var following = []

    // Get the list of users that we follow
    if(followingTable){
        //Process results
        for(i in followingTable){
            following.push(followingTable[i]["follows"])
        }
    }

    // For every tweet that exists.
    for (i in tweetTable){

        var postUsername = tweetTable[i]["username"]

        // Get tweet if we meet the following criteria
        // 1. We are not logged in (show all)
        // 2. It is our tweet
        // 3. We are following the tweeter
        if(username == "" || username == postUsername || following.includes(postUsername)){
            var tweet = {
                datetime: tweetTable[i]["RowKey"],
                username: postUsername,
                message: tweetTable[i]["message"],
            }

            results.push(tweet)
        }
    }

    // Sort by date. (rowKey)

    results.sort((a, b) => (a.datetime < b.datetime) ? 1: -1)

    if(tweetTable){
        context.res = {
            status: 200,
            body: results
        }
    }else{
        context.res = {
            status: 400,
            body: {}
        }
    }
};
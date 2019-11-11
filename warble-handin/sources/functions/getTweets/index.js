module.exports = async function (context, req) {
    context.log('getTweets was triggered.');

    const tweetTable = context.bindings.tweetTable;

    var results = []

    // Get the tweet data
    for (i in tweetTable){
        var tweet = {
            datetime: tweetTable[i]["RowKey"],
            username: tweetTable[i]["username"],
            message: tweetTable[i]["message"]
        }

        results.push(tweet)
    }

    // Sort by date.
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
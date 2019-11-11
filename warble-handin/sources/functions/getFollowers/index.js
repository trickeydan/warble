module.exports = async function (context, req) {
    context.log('getFollowers was triggered.');

    const followerTable = context.bindings.followerTable;

    if(followerTable){
        var results = []

        for (i in followerTable){
            results.push(followerTable[i]["username"])
        }
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
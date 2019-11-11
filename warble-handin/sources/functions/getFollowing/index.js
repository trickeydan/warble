module.exports = async function (context, req) {
    context.log('getFollowing was triggered.');

    const followingTable = context.bindings.followingTable;

    if(followingTable){
        var results = []

        for (i in followingTable){
            results.push(followingTable[i]["follows"])
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
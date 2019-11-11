module.exports = async function (context, req) {
    context.log('getUser was triggered.');

    const inputTable = context.bindings.inputTable;

    // If the user exists.
    if(inputTable){
        var name = inputTable["name"]
        var username = req.query.username || req.body.username

        context.res = {
            status: 200,
            body: {'name': name, 'username': username}
        }
    }else{
        context.res = {
            status: 400,
            body: {}
        }
    }
};
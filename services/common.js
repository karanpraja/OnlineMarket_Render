const passport = require("passport")

exports.isAuth=(req,res,done)=>{
    console.log("isAuth")
    // if(req.user){
        // if(req&&req.user){
        return passport.authenticate('jwt')
        // }else{
        //     return done()
        // }
    // }else{
    // res.send(401)
    // }
    }
exports.sanitizeUser=(user)=>{
    return {id:user.id,role:user.role}
}
exports.cookieExtractor = function(req) {
    var token = null;
    // console.log(req)
    if (req && req.cookies) {
        console.log("cookieEx")
        token = req.cookies['jwt'];
    }
    //  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTVlMGZjYjBjOGE0YWUzNTQ3OWI5MyIsInJvbGUiOiJhZG1pblxuIiwiaWF0IjoxNzA5NTY0NDQ4fQ.jYFNKLvsu3YkHd2Z7TVbvx9lNvE1BZ9SaGWWydYczPk"
  console.log({cookie:token})
    return token;
};
// ...
// opts.jwtFromRequest = cookieExtractor;
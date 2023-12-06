 


const {validationResult} = require('express-validator')

module.exports = {
    handleErrors(templateFunc, dataCb){
        return  async (req, res, next)=> {
            const errors = validationResult(req)
            let data = {};                       //// we define it outside bcs it should be available outside of if block and data = {} because otherwise it will undefine case of no dataCb
            if(!errors.isEmpty()){
                if(dataCb){
                    data = await dataCb(req)
                }
                return res.send(templateFunc({errors, ...data}))
            }
            next()
        }
    },
    requireAuth(req,res,next){
        if(!req.session.userId){
            return res.redirect('/signin')
          }
          next();
    }
}

//// now go to edit.js and show validation message
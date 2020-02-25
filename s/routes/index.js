const express =  require("express")
const router = express.Router()

const controllers = require("../controllers/blogControllers")

    router.get('/user/login/:account',(req, res) => {
        controllers.getBlogDetail(req, res)
        //res.send("123")
        //controllers.getBlogDetail
       
    })



router.get('/',(req, res) => res.send('Home!'))

module.exports = router 
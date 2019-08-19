const express = require("express")
const router = express.Router()
const User = require("../helperFunctions/db-helperFunctions")

router.get("/users", (req, res)=>{

    User.getAll().then(user=>{
        res.status(200).json({Hello: "From userRouter.js"})
    })
}
)

module.exports = router
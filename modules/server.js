module.exports = () => {
    const expressApp = require("express")()
    expressApp.get('/', function (req, res) {
        res.send('Hi');
     })
    expressApp.listen(() => {
        console.log("App is ready")
    })
}
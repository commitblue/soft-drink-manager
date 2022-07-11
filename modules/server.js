module.exports = () => {
    require("http").createServer((req, res) => {req.send("HI")}).listen(3030)
}
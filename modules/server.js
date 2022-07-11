module.exports = () => {
    require("http").createServer((req, res) => {res.send("HI")}).listen(3030)
}
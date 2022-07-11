module.exports = () => {
    require("http").createServer((req, res) => {res.write("HI") res.end()}).listen(3030)
}
module.exports = {
    getUserIdFromTag : (tag) => {
        return tag.replace("<@", "").replace(">", "")
    }
}
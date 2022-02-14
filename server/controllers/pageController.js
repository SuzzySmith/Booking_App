
exports.home = async (req, res) => {
    res.render('pages/index', {title: "Home"})
     
}

exports.error = async (req,res) => {
    res.sendFile('error/index', { root: __dirname})
}
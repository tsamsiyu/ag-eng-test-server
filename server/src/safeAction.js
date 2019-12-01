module.exports = (action) => {
    return (req, res) => {
        return action(req, res).catch((e) => {
            res.status(500);
            return res.json({messaeg: e.message});
        });
    }
};

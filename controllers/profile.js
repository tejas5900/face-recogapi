const handleProfile=(req,res,db)=>{
    db.select('*').from('userinfo').where({
        id:req.params.id,
    })
    .then(user=>{
        if(user.length){
            res.json(user);
        }
        else{
            res.status(400).json("Error getting user profile")
        }
        })
    .catch(err=> {
        res.status(400).json("Profile fetching error")
    })
}

module.exports={
    handleProfile: handleProfile
};
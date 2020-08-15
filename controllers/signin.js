const handleSignin= (req,res,db,bcrypt)=> {
const {email,password}=req.body;
if(!email || !password){
    return res.status(400).json("Error while signing in"); 
}
db.select('email','hash').from('login')
.where('email','=',email)
.then(data=>{
    const isValid=bcrypt.compareSync(password, data[0].hash);
    console.log(isValid)
    if(isValid){
        return  db.select('*').from('userinfo')
        .where('email','=',email)
        .then(user=>{
            console.log(user)
            res.json(user[0])
        }).catch(err=> res.status(400).json("unable to get users"))
    }
    else{
        res.status(400).json("Invalid Credentials")
    }
    })
.catch(err=> res.status(400).json("Invalid Credent"))
}

module.exports={
    handleSignin : handleSignin
};
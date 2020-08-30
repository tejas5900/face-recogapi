const Clarifai=require('clarifai');

const app = new Clarifai.App({
    apiKey: '6f5fc29039c141cdbcec00e9d79e9e36'
   });
  
const handleApi= (req,res)=> {
    app.models
    .predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input )
     .then(data => {
        res.json(data); 
     })
     .catch(err=> res.status(400).json("API connection issue"));
}

const handleImage=(req,res,db)=>{
db('userinfo').where('id', '=', req.body.id)
.increment('entries', 1)
.returning('entries')
.then(entries=>{
    res.json(entries);
    })
.catch(err=>{
    res.status(400).json("error while loading the image")
})
}

module.exports={
    handleImage,
     handleApi
};
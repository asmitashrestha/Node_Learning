module.exports = (req,res) =>{
  if(req.url == 'api/movies'){
    try {
      console.log("Request body",req.body)
    } catch (error) {
      
    }
  }
}
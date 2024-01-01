const { response } = require('express')
const http = require('http')
const getReq = require('./methods/getReq')
const postReq = require('./methods/postReq')
const deleteReq = require('./methods/deleteReq')
const putReq = require('./methods/putReq')
const movies = require('./data/movies.json')

require('dotenv').config()
const PORT = process.env.PORT || 5001

const server = http.createServer((req,res) =>{
  req.movies = movies
  switch(req.method){
    case 'GET':
      getReq(req,res);
      break;
    case 'POST':
      postReq(req,res);
      break;
    case 'PUT':
      putReq(req,res);
      break;
    case 'DELETE': 
      deleteReq(req,res);
      break;
    default:
      response.statusCode = 404
    res.setHeader("Content-Type", "application/json")
    res.write(JSON.stringify({message :"Route Not Found"}))
    res.end()
}
})
  

server.listen(PORT, ()=>{
  console.log(`Server started on port : ${PORT}`);
})
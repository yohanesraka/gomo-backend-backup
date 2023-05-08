const {execFile} = require('child_process');

// IGNORE THIS CODE, only for testing
module.exports = (app) =>{
    app.post('/build-dashboard',(req,res) => {
        execFile('/home/sembadafarm/web/gembala.sembadafarm.com/pull.sh', (err, stdout, stderr) => {
            // if (err) {
            //     console.error(err)
            //     res.writeHead(404)
            //     return res.end()
            // }    
            // res.writeHead(200)
            // res.end()
        })
        res.writeHead(200)
        res.end()
    })  
}
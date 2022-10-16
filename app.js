// Imports
const express = require('express')
const app = express()
const port = 5000



// 










// 



app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

app.set('views', './views');
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/images'))


app.get('', (req, res) => {
    res.render(__dirname + '/views/index.html')
})

app.listen(port, () => console.info(`App listening on port ${port}`))
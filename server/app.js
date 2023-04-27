const express = require('express');
const app = express();
var __dirname = 'G:\\c\\bbclub';
app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

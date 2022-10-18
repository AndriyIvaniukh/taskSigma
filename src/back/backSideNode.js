const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/prebidInfo', createPrebid);

app.use('*', (req, res) => {
    res.status(400).json('Unknown routes');
})

app.listen(5000, () => {
    console.log('Started at port 5000');
});


function createPrebid (req,res){
    try{
        const newPrebid = req.body;
        console.log(newPrebid);
        res.status(200).json();
    }catch (e) {
        throw new Error(e);
    }
}

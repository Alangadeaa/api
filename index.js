const express = require('express');
const mongoose = require ('mongoose');

const PORT = 3000;
const DB = 'mongodb://127.0.0.1/ml';

mongoose.set('strictQuery', true);
mongoose.connect(DB)
.then(() => console.log('DB anda'));

const app = express();
app.use(express.json());

const ProductoSchmea = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    precio: Number,
    stock: Number,
    categoria: String
});

const Producto = mongoose.model('Producto', ProductoSchmea);

app.get('/api/productos', (req, res) => {
    Producto.find((err, productos) =>{
        res.status(200).json(productos);
    });
});

app.get('/api/productos/:id', (req, res) => {
    Producto.findById(req.params.id, (err, producto) => {
        res.status(200).json(producto);
    });
});

app.get('/api/productos/categoria/:algo', (req, res) => {
    Producto.find({ categoria: req.params.algo}, (err, producto) => {
        res.status(200).json(producto);
    });
});

app.post('/api/productos', (req, res) => {
    const { titulo, descripcion, precio, stock, categoria } = req.body;
    const newProducto = new Producto( { titulo, descripcion, precio, stock, categoria } );
    newProducto.save((err, producto) => {
        res.status(201).json(producto);
    });
});
 
app.put('/api/productos/:id', (req, res) => {
    const  {titulo, descripcion, precio, stock, categoria } = req.body;
    const data =  {titulo, descripcion, precio, stock, categoria };
    Producto.findByIdAndUpdate(req.params.id, data, { new:true }, (err, producto) =>{
        res.status(200).json(producto);
    });
});

app.delete('/api/productos/:id', (req, res) => {
    Producto.findByIdAndDelete(req.params.id, err => {
        res.status(200).json({ msg:'producto borrado'});
    });
});

app.listen(PORT, () => {
    console.log('PORT anda');
});
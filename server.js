const express = require("express")

const app = express()
const PORT = 8080
app.use(express.json())
let productos = []
app.get('/', (req, res) => {
	res.json(productos)
});
app.get('/:id', (req, res) => {
	const { id } = req.params
	const productoFiltrado = productos.filter(p => p.id === parseInt(id))
	res.json(productoFiltrado)
});
app.post('/', (req, res) => {
	const {title, description, code, price, status, stock , category , thumbnails} = req.body
	const nuevoProducto = {
		id: productos.length + 1,
		title: title,
		description:description ,
		code: code,
		price: price,
		status: status,
		stock: stock,
		category:category,
		thumbnails:[...thumbnails],
	}
	productos.push(nuevoProducto)
	res.status(200).json(nuevoProducto)
});
app.put('/:id', (req, res) => {
	const {title, description, code, price, status, stock , category , thumbnails} = req.body
	const {id} = req.params
	productoFiltrado = productos.find(p => p.id === parseInt(id))
	productoFiltrado.title = title ||  productoFiltrado.title
	productoFiltrado.description = description ||  productoFiltrado.description
	productoFiltrado.code = code ||  productoFiltrado.code
	productoFiltrado.price = price ||  productoFiltrado.price
	productoFiltrado.status = status ||  productoFiltrado.status
	productoFiltrado.stock = stock ||  productoFiltrado.stock
	productoFiltrado.category = category ||  productoFiltrado.category
	productoFiltrado.thumbnails = thumbnails ||  productoFiltrado.thumbnails

	res.json(productoFiltrado)
	res.status(200).json(nuevoProducto)
});

app.listen(PORT, () => {
	console.log("Servido escuchando en el puerto" + PORT)
})
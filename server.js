const express = require("express")

const app = express()
const PORT = 8080
app.use(express.json())
let productos = []
app.get('/', (req, res) => {
	res.json(productos)
});
app.get('/:pid', (req, res) => {
	const { pid } = req.params
	const productoFiltrado = productos.filter(p => p.id === parseInt(pid))
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
app.put('/:pid', (req, res) => {
	const {title, description, code, price, status, stock , category , thumbnails} = req.body
	const {pid} = req.params
	productoFiltrado = productos.find(p => p.id === parseInt(pid))
	productoFiltrado.title = title ||  productoFiltrado.title
	productoFiltrado.description = description ||  productoFiltrado.description
	productoFiltrado.code = code ||  productoFiltrado.code
	productoFiltrado.price = price ||  productoFiltrado.price
	productoFiltrado.status = status ||  productoFiltrado.status
	productoFiltrado.stock = stock ||  productoFiltrado.stock
	productoFiltrado.category = category ||  productoFiltrado.category
	productoFiltrado.thumbnails = thumbnails ||  productoFiltrado.thumbnails

	res.status(200).json(productoFiltrado)
});

app.delete("/:pid", (req, res) => {
	const {pid} = req.params
	productos = productos.filter(p => p.id !== parseInt(pid))

	res.status(200).json(productos)
	
});

app.listen(PORT, () => {
	console.log("Servido escuchando en el puerto" + PORT)
})
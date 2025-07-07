const express = require("express");

const app = express();
const PORT = 8080;

app.use(express.json());

let productos = [];
let carts = [];

// --- Productos ---

app.get('/products', (req, res) => {
	res.json(productos);
});

app.get('/products/:pid', (req, res) => {
	const { pid } = req.params;
	const producto = productos.find(p => p.id === parseInt(pid));
	if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
	res.json(producto);
});

app.post('/products', (req, res) => {
	const { title, description, code, price, status, stock, category, thumbnails } = req.body
	const nuevoProducto = {
		id: productos.length + 1,
		title: title,
		description: description,
		code: code,
		price: price,
		status: status,
		stock: stock,
		category: category,
		thumbnails: [...thumbnails],
	}
	productos.push(nuevoProducto)
	res.status(200).json(nuevoProducto)
});

app.put('/products/:pid', (req, res) => {
	const { pid } = req.params;
	const producto = productos.find(p => p.id === parseInt(pid));
	if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

	const { title, description, code, price, status, stock, category, thumbnails } = req.body;
	producto.title = title || producto.title;
	producto.description = description || producto.description;
	producto.code = code || producto.code;
	producto.price = price || producto.price;
	producto.status = status || producto.status;
	producto.stock = stock || producto.stock;
	producto.category = category || producto.category;
	producto.thumbnails = thumbnails || producto.thumbnails;

	res.status(200).json(producto);
});

app.delete("/products/:pid", (req, res) => {
	const { pid } = req.params;
	productos = productos.filter(p => p.id !== parseInt(pid));
	res.status(200).json({ message: "Producto eliminado" });
});

// Carritos 

app.post("/carts", (req, res) => {
	const nuevoCarrito = {
		id: carts.length + 1,
		products: [] 
	};
	carts.push(nuevoCarrito);
	res.status(201).json(nuevoCarrito);
});

app.get("/carts", (req, res) => {
	res.json(carts);
});

app.get("/carts/:cid", (req, res) => {
	const { cid } = req.params;
	const carrito = carts.find(c => c.id === parseInt(cid));
	if (!carrito) {
		return res.status(404).json({ error: "Carrito no encontrado" });
	}
	res.json(carrito);
});

app.post("/carts/:cid/product/:pid", (req, res) => {
	const { cid, pid } = req.params;
	const carrito = carts.find(c => c.id === parseInt(cid));
	if (!carrito) return res.status(404).json({ error: "Carrito no encontrado" });

	const producto = productos.find(p => p.id === parseInt(pid));
	if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

	const item = carrito.products.find(p => p.product === producto.id);
	if (item) {
		item.quantity += 1;
	} else {
		carrito.products.push({ product: producto.id, quantity: 1 });
	}

	res.status(200).json(carrito);
});

// --- Servidor ---
app.listen(PORT, () => {
	console.log("Servidor escuchando en el puerto " + PORT);
});


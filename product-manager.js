const fs = require('fs').promises

class ProductManager {

    constructor() {
        this.path = './products.json'
    }

    getProducts = async () => {

        const content = await fs.readFile(this.path, 'utf-8');
        console.log('Prductos:', content);

    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        const content = await fs.readFile(this.path, 'utf-8');

        if(!content){
            await fs.writeFile(this.path, JSON.stringify([]))
        }

        const products = JSON.parse(content)

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return console.log('Todos los campos son obligatorios');
        }

        const codeCheck = products.find(el => el.code == code)
        if (codeCheck) return console.log(`El codigo: ${code} cob nombre ${title} ya existe, cmabairlo por uno no existente`);
        
        products.push({
            // id: Estoy primero verificando si el array de this.products tiene almenos un elemento
            // Despues busco el id del ultimo objeto dentro del array y le sumo 1: this.products[this.products.length - 1].id + 1
            // Si no hay elementos se ejecuta el else y le da el valor de 1
            id: products.length !== 0 ? products[products.length - 1].id + 1 : 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        })

        await fs.writeFile(this.path, JSON.stringify(products, null, 2))

    }

}

const allProducts = new ProductManager();

allProducts.addProduct('Momo', 'Una perrita muy linda, con una dueña que esta muy buena', 1, 'img', 4556, 1)
allProducts.addProduct('Guitarra', 'Guitarra Tayor en madera de Roble', 300, 'img', 1234, 5)

allProducts.getProducts();

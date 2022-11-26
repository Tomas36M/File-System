const fs = require('fs')

class ProductManager {

    constructor() {
        this.path = './products.json'
    }

    writeFile = async (title, description, price, thumbnail, code, stock) => {

        const newProduct = {
            id: 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        await fs.promises.writeFile(this.path, JSON.stringify([newProduct], null, 2))
    }

    getProducts = async () => {

        if (fs.existsSync(this.path)) {
            const content = await fs.promises.readFile(this.path, 'utf-8');
            if (!content) {
                return console.log('no hay productos');
            }
            console.log('Prductos:', JSON.parse(content));
        } else {
            console.log('El archivo no existe');
        }

    }

    getProductById = async (id) => {

        const content = await fs.promises.readFile(this.path, 'utf-8');
        
        if (!content) {
            return console.log('no hay productos');
        }

        const products = JSON.parse(content);

        const idCheck = products.find(el => el.id == id);

        if (idCheck) {
            console.log(`This is the object with id ${id}`, idCheck)
            return idCheck
        } else {
            console.log(`El id: ${id} no existe`);
        }
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return console.log('Todos los campos son obligatorios');
        }

        if (fs.existsSync(this.path)) {

            const content = await fs.promises.readFile(this.path, 'utf-8');

            if (!content) {
                this.writeFile(title, description, price, thumbnail, code, stock)
                return
            }

            const products = JSON.parse(content);

            const codeCheck = products.find(el => el.code == code);
            if (codeCheck) return console.log(`El codigo: ${code} cob nombre ${title} ya existe, cmabairlo por uno no existente`);

            products.push({
                id: products[products.length - 1].id + 1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            });

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))

        } else {

            this.writeFile(title, description, price, thumbnail, code, stock);

        }

    }

    updateProduct = async (id, key, value) => {

        const content = await fs.promises.readFile(this.path, 'utf-8');
        
        if (!content) {
            return console.log('no hay productos');
        }

        const products = JSON.parse(content);

        const changingObj = products.find(el => el.id == id)

        if (changingObj) {

            changingObj[key] = value;
            products.splice(id - 1,1,changingObj);

        } else {
            console.log(`El id: ${id} no existe`);
        }

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))

    }

    deleteProduct = async (id) => {

        const content = await fs.promises.readFile(this.path, 'utf-8');
        
        if (!content) {
            return console.log('no hay productos');
        }

        const products = JSON.parse(content);

        const deletedObj = products.find(el => el.id == id)

        if (deletedObj) {
            products.splice(id - 1,1);
        } else {
            console.log(`El id: ${id} no existe`);
        }

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
    }

}

const allProducts = new ProductManager();

const callMethods = async () => {

    // await allProducts.addProduct('Momo', 'Una perrita muy linda, con una dueña que esta muy buena', 1, 'img', 4556, 1)

    // await allProducts.addProduct('Guitarra', 'Guitarra Tayor en madera de Roble', 300, 'img', 1234, 5)

    // await allProducts.getProductById(2)

    await allProducts.updateProduct(1, 'title', 'Momo');

    // await allProducts.deleteProduct(2)

    // await allProducts.getProducts();

}

callMethods()

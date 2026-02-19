import { conexion } from '../db.js';

export const getProducts = async (req, res) => {
    try {
        const { id } = req.params;
        var where = (id === undefined) ? '' : 'WHERE id ="' + id + '" ';
        const [rows] = await conexion.query('SELECT * FROM products ' + where);
        return res.json(rows);
    }
    catch (error) {
        return res.status(500).json({ message: 'error' });
    }
};

export const saveProducts = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        var validacion = validar(name, description, price);
        if (Object.entries(validacion).length === 0) {
            await conexion.query(
                'INSERT INTO products(name,description,price) VALUES (?,?,?)',
                [name, description, price]);
            return res.status(200).json({ status: 'success' });
        }
        else {
            return res.status(500).json([{ status: 'error' }, { errors: validacion }]);
        }
    }
    catch (error) {
        return res.status(500).json({ status: 'error:' + error });
    }
};
export const updateProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        var validacion = validar(name, description, price);
        if (Object.entries(validacion).length === 0) {
            const [result] = await conexion.query(
                'UPDATE products SET name = ? , description = ? , price = ? WHERE id = ?',
                [name, description, price, id]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ status: 'error', errors: [{ id: 'No existe el ID' }] });
            }
            return res.status(200).json({ status: 'success' });
        }
        else {
            return res.status(500).json([{ status: 'error' }, { errors: validacion }]);
        }
    }
    catch (error) {
        return res.status(500).json({ status: 'error:' + error });
    }
};
export const deleteProducts = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await conexion.query('DELETE FROM products WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'error', errors: [{ id: 'No existe el ID' }] });
        }
        return res.status(200).json({ status: 'success' });
    }
    catch (error) {
        return res.status(500).json({ status: 'error:' + error });
    }
};

function validar(name, description, price) {
    var errors = [];
    if (name === undefined || name.trim() === '' || name.lenght > 50) {
        errors.push({
            name:
                ['El nombre del producto NO debe estar vacío y debe tener máximo 50 caracteres']
        });
    }
    if (description === undefined || description.trim() === '' || description.lenght > 150) {
        errors.push({
            description:
                ['La descripción del producto NO debe estar vacía y debe tener máximo 150 caracteres']
        });
    }
    if (price === undefined || price.trim() === '' || price.lenght > 6 || isNaN(price)) {
        errors.push({
            price:
                ['El precio del producto NO debe estar vacío y debe ser numérico']
        });
    }
    return errors;
}
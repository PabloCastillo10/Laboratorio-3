import clienteModel from "./cliente.model.js";


export const createCliente = async (req, res) => {
    try {
        const data = req.body;

        if(req.user.role !== "ADMIN_ROLE") {
            return res.status(403).json({ message: "No tiene permisos para realizar esta acción" });
        }

        const cliente = await clienteModel.create({
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            direccion : data.direccion,
            telefono: data.telefono
        });

        res.status(200).json({
            msg: 'Cliente registrado correctamente :)',
            clienteDetails : {
                cliente: cliente
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const getCliente = async (req, res) => {
    try {
        const cliente = await clienteModel.find()
        res.status(200).json({
            msg: 'Clientes obtenidos correctamente',
            clientes: cliente
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}


export const getClienteById = async (req, res) => {
    try {
        const cliente = await clienteModel.findById(req.params.id)
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.status(200).json({
            msg: 'Cliente obtenido correctamente',
            cliente: cliente
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const updateCliente = async (req, res) => {
    try {
        const {id} = req.params;
        const {_id, email , ...data} = req.body;
        const cliente = await clienteModel.findByIdAndUpdate(id, data, {new: true});

        

        if(!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        if(req.user.role!== "ADMIN_ROLE") {
            return res.status(403).json({ message: "No tiene permisos para realizar esta acción" });
        }

        const clienteActualizado = await clienteModel.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            msg: 'Cliente modificado correctamente',
            cliente: clienteActualizado
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}


export const deleteCliente = async (req, res) => {
    try {
        const {id} = req.params;
        const cliente = await clienteModel.findById(id);

       

        if(!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        if(req.user.role!== "ADMIN_ROLE") {
            return res.status(403).json({ message: "No tiene permisos para realizar esta acción" });
        }

        const deleteCliente = await clienteModel.findByIdAndUpdate(id, {estado : false }, {new: true})

        res.status(200).json({
            msg: 'Cliente eliminado correctamente',
            cliente: deleteCliente
        })
    } catch (error){ 
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

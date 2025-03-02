import empresaModel from "./empresa.model.js";


export const createEmpresa = async (req, res) => {
    try {
        const data = req.body;


        if(req.user.role!== "ADMIN_ROLE") {
            return res.status(403).json({ message: "No tiene permisos para realizar esta acción" });
        }


        const empresa = await empresaModel.create(data);

        res.status(201).json({
            msg: "Empresa creada correctamente",
            empresa
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al agregar empresas" });
    }
}

export const getEmpresas = async (req, res) => {
    try {
        const empresas = await empresaModel.find();
        res.status(200).json({
            msg: "Empresas obtenidas correctamente",
            empresas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el listado de empresa" });
    }
}

export const getEmpresaTrayectoria = async (req, res) => {
    try {
        const { aniosTrayectoria } = req.params; 
        const trayectoriaNum = parseInt(aniosTrayectoria, 10); 

        if (isNaN(trayectoriaNum)) {
            return res.status(400).json({ message: "El valor de trayectoria debe ser un número válido" });
        }

        const empresas = await empresaModel.find({ aniosTrayectoria: trayectoriaNum });

        res.status(200).json({
            msg: "Trayectoria de empresas obtenida correctamente",
            empresas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la trayectoria de empresas" });
    }
};


export const getEmpresaCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;
        const empresas = await empresaModel.find({ categoria });
        res.status(200).json({
            msg: "Empresas por categoría obtenidas correctamente",
            empresas
        });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener empresas por categoría" });
        }
}

export const getEmpresaAZ = async (req, res) => {
    try {
        const empresas = await empresaModel.find().sort({ nombre: 1 });
        res.status(200).json({
            msg: "Empresas ordenadas alfabéticamente obtenidas correctamente",
            empresas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener empresas ordenadas alfabéticamente" });
    }
}


export const getEmpresaZA = async (req, res) => {
    try {
        const empresas = await empresaModel.find().sort({ nombre: -1 });
        res.status(200).json({
            msg: "Empresas ordenadas alfabéticamente inversa obtenidas correctamente",
            empresas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener empresas ordenadas alfabéticamente inversa" });
    }
}


export const updatrEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const empresa = await empresaModel.findByIdAndUpdate(id, data, { new: true });
        
        if(req.user.role!== "ADMIN_ROLE") {
            return res.status(403).json({ message: "No tiene permisos para realizar esta acción" });
        }

        res.status(200).json({
            msg: "Empresa modificada correctamente",
            empresa
        });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al actualizar la empresa" });
        }
}
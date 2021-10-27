import {Router} from 'express';

import {CAdministrador} from './controller/CAdministrador';
import {CArticulo} from './controller/CArticulo';
import {CCliente} from './controller/CCliente';

const router = Router();

//administrador's routes
let cAdministrador: CAdministrador = new CAdministrador();
router.get('/administrador', cAdministrador.getList);
router.get('/administrador/:id', cAdministrador.getById);
router.post('/administrador/crear', cAdministrador.postAdministrador);
router.put('/administrador/modificar/:id', cAdministrador.putAdministrador);
router.delete('/administrador/eliminar/:id', cAdministrador.deleteAdministrador);

// articulo's routes
let cArticulo: CArticulo = new CArticulo();
router.get('/articulo', cArticulo.getList);
router.get('/articulo/:id', cArticulo.getById);
router.post('/articulo/crear', cArticulo.postArticulo);
router.put('/articulo/modificar/:id', cArticulo.putArticulo);
router.delete('/articulo/eliminar/:id', cArticulo.deleteArticulo);

// cliente's routes
let cCliente: CCliente = new CCliente();
router.get('/cliente', cCliente.getList);
router.get('/cliente/:id', cCliente.getById);
router.post('/cliente/crear', cCliente.postCliente);
router.put('/cliente/modificar/:id', cCliente.putCliente);
router.delete('/cliente/eliminar/:id', cCliente.deleteCliente);

export default router;
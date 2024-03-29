import {Router} from 'express';

import {CAdministrador} from './controller/CAdministrador';
import {CArticulo} from './controller/CArticulo';
import {CCliente} from './controller/CCliente';
import {CGarantia} from './controller/CGarantia';
import {CLocal} from './controller/CLocal';
import {CNotaAlquiler} from './controller/CNotaAlquiler';

const router = Router();

router.get('/', (req, res) => {
    res.render('home');
});

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

// garantia's routes
let cGarantia: CGarantia = new CGarantia();
router.get('/garantia', cGarantia.getList);
router.get('/garantia/:id', cGarantia.getById);
router.post('/garantia/crear', cGarantia.postGarantia);
router.put('/garantia/modificar/:id', cGarantia.putGarantia);
router.delete('/garantia/eliminar/:id', cGarantia.deleteGarantia);

// local's routes
let cLocal: CLocal = new CLocal();
router.get('/local', cLocal.getList);
router.get('/local/:id', cLocal.getById);
router.post('/local/crear', cLocal.postLocal);
router.put('/local/modificar/:id', cLocal.putLocal);
router.delete('/local/eliminar/:id', cLocal.deleteLocal);

router.get('/local/inventario/:cod_local', cLocal.getListInventario);
router.get('/local/inventario/:cod_local/:cod_articulo', cLocal.getListInventarioById);
router.post('/local/inventario/crear', cLocal.postInventario);
router.put('/local/inventario/modificar/:cod_local/:cod_articulo', cLocal.putInventario);
router.delete('/local/inventario/eliminar/:cod_local/:cod_articulo', cLocal.deleteInventario);

// notaalquiler's routes
let cNotaAlquiler: CNotaAlquiler = new CNotaAlquiler();
router.get('/notaalquiler', cNotaAlquiler.getList);
router.get('/notaalquiler/:id', cNotaAlquiler.getById);
router.post('/notaalquiler/crear', cNotaAlquiler.postNotaAlquiler);
router.put('/notaalquiler/modificar/:id', cNotaAlquiler.putNotaAlquiler);
router.put('/notaalquiler/modificar_pendiente/:id', cNotaAlquiler.putPendienteNotaAlquiler);
router.put('/notaalquiler/modificar_entregado/:id', cNotaAlquiler.putEntregadoNotaAlquiler);
router.put('/notaalquiler/modificar_devuelto/:id', cNotaAlquiler.putDevueltoNotaAlquiler);
router.put('/notaalquiler/modificar_retrasado/:id', cNotaAlquiler.putRetrasadoNotaAlquiler);
router.delete('/notaalquiler/eliminar/:id', cNotaAlquiler.deleteNotaAlquiler);

router.get('/notaalquiler/articulo_garantia/:nro', cNotaAlquiler.getListArticuloGarantia);
router.post('/notaalquiler/articulo/crear', cNotaAlquiler.postNotaAlquilerArticulo);
router.delete('/notaalquiler/articulo/eliminar/:nro/:cod', cNotaAlquiler.deleteNotaAlquilerArticulo);
router.post('/notaalquiler/garantia/crear', cNotaAlquiler.postNotaAlquilerGarantia);
router.delete('/notaalquiler/garantia/eliminar/:nro/:cod', cNotaAlquiler.deleteNotaAlquilerGarantia);
export default router;
import {Router} from 'express';

import {CAdministrador} from './controller/CAdministrador';

const router = Router();

//administrador's routes
let cAdministrador: CAdministrador = new CAdministrador();
router.get('/administrador', cAdministrador.getList);
router.post('/administrador/crear', cAdministrador.postAdministrador);
router.put('/administrador/modificar/:id', cAdministrador.putAdministrador);
router.delete('/administrador/eliminar/:id', cAdministrador.deleteAdministrador);

//

export default router;
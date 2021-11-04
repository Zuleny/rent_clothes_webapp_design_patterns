import { Request, Response } from "express";

import {MNotaAlquiler} from '../model/MNotaAlquiler';
import {VNotaAlquiler} from '../views/notaalquiler/VNotaAlquiler';
import { MLocal } from "../model/MLocal";
import {MCliente} from "../model/MCliente";
import {MArticulo} from '../model/MArticulo';
import {MGarantia} from '../model/MGarantia';
import { MNotaAlquilerArticulo } from "../model/MNotaAlquilerArticulo";
import {MNotaAlquilerGarantia} from "../model/MNotaAlquilerGarantia";

export class CNotaAlquiler{
    private _mNotaAlquiler: MNotaAlquiler;
    private _vNotaAlquiler: VNotaAlquiler;

    private _mLocal: MLocal;
    private _mCliente: MCliente;

    private _mNotaAlquilerArticulo: MNotaAlquilerArticulo;
    private _mArticulo: MArticulo;

    private _mNotaAlquilerGarantia: MNotaAlquilerGarantia;
    private _mGarantia: MGarantia;
    
    

    /**
     * constructor
     */
    public constructor() {
        this._mNotaAlquiler = new MNotaAlquiler();
        this._vNotaAlquiler = new VNotaAlquiler();

        this._mLocal = new MLocal();
        this._mCliente = new MCliente();

        this._mNotaAlquilerArticulo = new MNotaAlquilerArticulo();
        this._mArticulo = new MArticulo();

        this._mNotaAlquilerGarantia = new MNotaAlquilerGarantia();
        this._mGarantia = new MGarantia();
    }

    /**
     * get the list of all nota alquilereses
     * @param request HTTP request
     * @param response HTTP response
     */
    public getList = async (request: Request, response: Response): Promise<void> =>{
        try {
            let list = await this._mNotaAlquiler.getAll();
            let localList = await this._mLocal.getAll();
            let clienteList = await this._mCliente.getAll();
            this._vNotaAlquiler.renderView(response, {list, localList, clienteList});
        } catch (error) {
            console.error("Error into CNotaAlquiler > getList: " + error);
            this._vNotaAlquiler.renderView(response, {error: "Error al obtener la lista de nota alquileres"});
        }
    }

    /**
     * get a specific nota alquiler
     * @param request HTTP request
     * @param response HTTP response
     */
    public getById = async (request: Request, response: Response): Promise<void> =>{
        try {
            let entity = await this._mNotaAlquiler.getById(request.params.id);
            let list = await this._mNotaAlquiler.getAll();
            let localList = await this._mLocal.getAll();
            let clienteList = await this._mCliente.getAll();
            this._vNotaAlquiler.renderView(response, {list, entity, localList, clienteList});
        } catch (error) {
            console.error("Error into CNotaAlquiler > getById: " + error);
            this._vNotaAlquiler.renderView(response, {error: "Error al obtener los datos de la nota alquiler"});
        }
    }
    
    /**
     * register a new nota alquiler
     * @param request HTTP request
     * @param response HTTP response
     */
    public postNotaAlquiler = async (request: Request, response: Response): Promise<void> => {
        try {
            let { concepto, fecha_devolucion, codigo_local, ci_cliente } = request.body;
            let post = await this._mNotaAlquiler.create({concepto, fecha_devolucion, codigo_local, ci_cliente});
            this._vNotaAlquiler.redirectViewArticuloGarantia(response, post.nro);
        } catch (error) {
            console.log("Error into CNotaAlquiler > postNotaAlquiler", error);
            this._vNotaAlquiler.renderView(response,{error: "Error al registrar al nota alquiler"});
        }
    }

    /**
     * update a specific  nota alquiler
     * @param request HTTP request
     * @param response HTTP response
     */
    public putNotaAlquiler = async (request: Request, response: Response): Promise<void> => {
        try {
            let { concepto, fecha_devolucion, codigo_local, ci_cliente } = request.body;
            let id = request.params.id;
            let put = await this._mNotaAlquiler.update(id, {concepto, fecha_devolucion, codigo_local, ci_cliente});
            let list = await this._mNotaAlquiler.getAll();
            let localList = await this._mLocal.getAll();
            let clienteList = await this._mCliente.getAll();
            this._vNotaAlquiler.renderView(response, {list, put, localList, clienteList});
        } catch (error) {
            console.log("Error into CNotaAlquiler > putNotaAlquiler", error);
            this._vNotaAlquiler.renderView(response, {error: "Error al modificar los datos del nota alquiler"});
        }
    }

    /**
     * delete a specific nota alquiler
     * @param request HTTP request
     * @param response HTTP response
     */
    public deleteNotaAlquiler = async (request: Request, response: Response): Promise<void> => {
        try {
            let id = request.params.id;
            let _delete = await this._mNotaAlquiler.delete(id);
            let list = await this._mNotaAlquiler.getAll();
            let localList = await this._mLocal.getAll();
            let clienteList = await this._mCliente.getAll();
            this._vNotaAlquiler.renderView(response, {list, _delete, localList, clienteList});
        } catch (error) {
            console.log("Error into CNotaAlquiler > deleteNotaAlquiler", error);
            this._vNotaAlquiler.renderView(response, {error: "Error al eliminar al nota alquiler"});
        }
    }

    /**
     * get the list of all notaalquilerarticulo and notaalquilergarantia
     * @param request HTTP request
     * @param response HTTP response
     */
    public getListArticuloGarantia = async (request: Request, response: Response): Promise<void> =>{
        try {
            let nro = request.params.nro;
            let notaalquiler = await this._mNotaAlquiler.getById(nro);

            let notaAlquilerArticulo = await this._mNotaAlquilerArticulo.getAll(nro);
            let articuloList = await this._mArticulo.getAll();

            let notaAlquilerGarantia = await this._mNotaAlquilerGarantia.getAll(nro);
            let garantiaList = await this._mGarantia.getAll();

            this._vNotaAlquiler.renderViewArticuloGarantia(response, {notaalquiler, notaAlquilerArticulo, articuloList, notaAlquilerGarantia, garantiaList});
        } catch (error) {
            console.log("Error in CNotaAlquiler > getListArticuloGarantia");
            this._vNotaAlquiler.renderView(response, {error: "Error al obtener los articulos y garantias"});
        }
    }

    /**
     * register a new notaalquilerarticulo
     * @param request HTTP request
     * @param response HTTP response
     */
    public postNotaAlquilerArticulo = async (request: Request, response: Response): Promise<void> => {
        try {
            let { nro_notaalquiler, codigo_articulo, cantidad } = request.body;
            let postArticulo = await this._mNotaAlquilerArticulo.create({nro_notaalquiler, codigo_articulo, cantidad});
            this._vNotaAlquiler.redirectViewArticuloGarantia(response, nro_notaalquiler);
        } catch (error) {
            console.log("Error into CNotaAlquiler > postNotaAlquilerArticulo", error);
            this._vNotaAlquiler.renderViewArticuloGarantia(response,{error: "Error al agregar articulos en la nota de alquiler"});
        }
    }

    /**
     * delete a specific notaalquilerarticulo
     * @param request HTTP request
     * @param response HTTP response
     */
    public deleteNotaAlquilerArticulo = async (request: Request, response: Response): Promise<void> => {
        try {
            let nro = request.params.nro;
            let codigoArticulo = request.params.cod;
            let deleteArticulo = await this._mNotaAlquilerArticulo.delete(nro, codigoArticulo);
            this._vNotaAlquiler.redirectViewArticuloGarantia(response, nro);
        } catch (error) {
            console.log("Error into CNotaAlquiler > deleteNotaAlquilerArticulo", error);
            this._vNotaAlquiler.renderViewArticuloGarantia(response,{error: "Error al eliminar articulo de la nota de alquiler"});
        }
    }

    /**
     * register a new notaalquilergarantia
     * @param request HTTP request
     * @param response HTTP response
     */
    public postNotaAlquilerGarantia = async (request: Request, response: Response): Promise<void> => {
        try {
            let { nro_notaalquiler, codigo_garantia, cantidad, detalle_especifico } = request.body;
            let postArticulo = await this._mNotaAlquilerGarantia.create({nro_notaalquiler, codigo_garantia, cantidad, detalle_especifico});
            this._vNotaAlquiler.redirectViewArticuloGarantia(response, nro_notaalquiler);
        } catch (error) {
            console.log("Error into CNotaAlquiler > postNotaAlquilerGarantia", error);
            this._vNotaAlquiler.renderViewArticuloGarantia(response,{error: "Error al agregar garantia en la nota de alquiler"});
        }
    }

    /**
     * delete a specific notaalquilergarantia
     * @param request HTTP request
     * @param response HTTP response
     */
    public deleteNotaAlquilerGarantia = async (request: Request, response: Response): Promise<void> => {
        try {
            let nro = request.params.nro;
            let codigoArticulo = request.params.cod;
            let deleteArticulo = await this._mNotaAlquilerGarantia.delete(nro, codigoArticulo);
            this._vNotaAlquiler.redirectViewArticuloGarantia(response, nro);
        } catch (error) {
            console.log("Error into CNotaAlquiler > deleteNotaAlquilerGarantia", error);
            this._vNotaAlquiler.renderViewArticuloGarantia(response,{error: "Error al agregar garantias en la nota de alquiler"});
        }
    }
}
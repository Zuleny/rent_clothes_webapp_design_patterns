import { Request, Response } from "express";

import {MLocal} from '../model/MLocal';
import {VLocal} from '../views/local/VLocal';
import {MAdministrador} from '../model/MAdministrador';

export class CLocal{
    private _mLocal: MLocal;
    private _vLocal: VLocal;
    private _mAdministrador: MAdministrador;

    /**
     * constructor
     */
    public constructor() {
        this._mLocal = new MLocal();
        this._vLocal = new VLocal();
        this._mAdministrador = new MAdministrador();
    }

    /**
     * get the list of all locales
     * @param request HTTP request
     * @param response HTTP response
     */
    public getList = async (request: Request, response: Response): Promise<void> =>{
        try {
            let list = await this._mLocal.getAll();
            let administradorList = await this._mAdministrador.getAll();
            this._vLocal.renderView(response, {list, administradorList});
        } catch (error) {
            console.error("Error into CLocal > getList: " + error);
            this._vLocal.renderView(response, {error: "Error al obtener la lista de locales"});
        }
    }

    /**
     * get a specific local
     * @param request HTTP request
     * @param response HTTP response
     */
    public getById = async (request: Request, response: Response): Promise<void> =>{
        try {
            let entity = await this._mLocal.getById(request.params.id);
            let list = await this._mLocal.getAll();
            let administradorList = await this._mAdministrador.getAll();
            this._vLocal.renderView(response, {list, entity, administradorList});
        } catch (error) {
            console.error("Error into CLocal > getById: " + error);
            this._vLocal.renderView(response, {error: "Error al obtener los datos del local"});
        }
    }
    
    /**
     * register a new local
     * @param request HTTP request
     * @param response HTTP response
     */
    public postLocal = async (request: Request, response: Response): Promise<void> => {
        try {
            let { nombre, direccion, telefono, id_administrador } = request.body;
            let post = await this._mLocal.create({nombre, direccion, telefono, id_administrador});
            let list = await this._mLocal.getAll();
            let administradorList = await this._mAdministrador.getAll();
            this._vLocal.renderView(response,{list, post, administradorList});
        } catch (error) {
            console.log("Error into CLocal > postLocal", error);
            this._vLocal.renderView(response,{error: "Error al registrar el local"});
        }
    }

    /**
     * update a specific  local
     * @param request HTTP request
     * @param response HTTP response
     */
    public putLocal = async (request: Request, response: Response): Promise<void> => {
        try {
            let { nombre, direccion, telefono, id_administrador } = request.body;
            let id = request.params.id;
            let put = await this._mLocal.update(id, {nombre, direccion, telefono, id_administrador});
            let list = await this._mLocal.getAll();
            let administradorList = await this._mAdministrador.getAll();
            this._vLocal.renderView(response, {list, put, administradorList});
        } catch (error) {
            console.log("Error into CLocal > putLocal", error);
            this._vLocal.renderView(response, {error: "Error al modificar los datos del local"});
        }
    }

    /**
     * delete a specific local
     * @param request HTTP request
     * @param response HTTP response
     */
    public deleteLocal = async (request: Request, response: Response): Promise<void> => {
        try {
            let id = request.params.id;
            let _delete = await this._mLocal.delete(id);
            let list = await this._mLocal.getAll();
            let administradorList = await this._mAdministrador.getAll();
            this._vLocal.renderView(response, {list, _delete, administradorList});
        } catch (error) {
            console.log("Error into CLocal > deleteLocal", error);
            this._vLocal.renderView(response, {error: "Error al eliminar el local"});
        }
    }
}
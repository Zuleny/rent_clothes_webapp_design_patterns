import { Request, Response } from "express";

import {MCliente} from '../model/MCliente';
import {VCliente} from '../views/cliente/VCliente';

export class CCliente{
    private _mCliente: MCliente;
    private _vCliente: VCliente;

    /**
     * constructor
     */
    public constructor() {
        this._mCliente = new MCliente();
        this._vCliente = new VCliente();
    }

    /**
     * get the list of all clientes
     * @param request HTTP request
     * @param response HTTP response
     */
    public getList = async (request: Request, response: Response): Promise<void> =>{
        try {
            let list = await this._mCliente.getAll();
            this._vCliente.renderView(response, {list});
        } catch (error) {
            console.error("Error into CCliente > getList: " + error);
            this._vCliente.renderView(response, {error: "Error al obtener la lista de clientes"});
        }
    }

    /**
     * get a specific cliente
     * @param request HTTP request
     * @param response HTTP response
     */
    public getById = async (request: Request, response: Response): Promise<void> =>{
        try {
            let entity = await this._mCliente.getById(request.params.id);
            let list = await this._mCliente.getAll();
            this._vCliente.renderView(response, {list, entity});
        } catch (error) {
            console.error("Error into CCliente > getById: " + error);
            this._vCliente.renderView(response, {error: "Error al obtener los datos del cliente"});
        }
    }
    
    /**
     * register a new cliente
     * @param request HTTP request
     * @param response HTTP response
     */
    public postCliente = async (request: Request, response: Response): Promise<void> => {
        try {
            let { ci, nombre, email, telefono } = request.body;
            let post = await this._mCliente.create({ci, nombre, email, telefono});
            let list = await this._mCliente.getAll();
            this._vCliente.renderView(response,{list, post});
        } catch (error) {
            console.log("Error into CCliente > postCliente", error);
            this._vCliente.renderView(response,{error: "Error al registrar el cliente"});
        }
    }

    /**
     * update a specific  cliente
     * @param request HTTP request
     * @param response HTTP response
     */
    public putCliente = async (request: Request, response: Response): Promise<void> => {
        try {
            let { nombre, email, telefono } = request.body;
            let id = request.params.id;
            let put = await this._mCliente.update(id, {nombre, email, telefono});
            let list = await this._mCliente.getAll();
            this._vCliente.renderView(response, {list, put});
        } catch (error) {
            console.log("Error into CCliente > putCliente", error);
            this._vCliente.renderView(response, {error: "Error al modificar los datos del cliente"});
        }
    }

    /**
     * delete a specific cliente
     * @param request HTTP request
     * @param response HTTP response
     */
    public deleteCliente = async (request: Request, response: Response): Promise<void> => {
        try {
            let id = request.params.id;
            let _delete = await this._mCliente.delete(id);
            let list = await this._mCliente.getAll();
            this._vCliente.renderView(response, {list, _delete});
        } catch (error) {
            console.log("Error into CCliente > deleteCliente", error);
            this._vCliente.renderView(response, {error: "Error al eliminar el cliente"});
        }
    }
}
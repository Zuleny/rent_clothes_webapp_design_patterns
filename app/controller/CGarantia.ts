import { Request, Response } from "express";

import {MGarantia} from '../model/MGarantia';
import {VGarantia} from '../views/garantia/VGarantia';

export class CGarantia{
    private _mGarantia: MGarantia;
    private _vGarantia: VGarantia;

    /**
     * constructor
     */
    public constructor() {
        this._mGarantia = new MGarantia();
        this._vGarantia = new VGarantia();
    }

    /**
     * get the list of all garantias
     * @param request HTTP request
     * @param response HTTP response
     */
    public getList = async (request: Request, response: Response): Promise<void> =>{
        try {
            let list = await this._mGarantia.getAll();
            this._vGarantia.renderView(response, {list});
        } catch (error) {
            console.error("Error into CGarantia > getList: " + error);
            this._vGarantia.renderView(response, {error: "Error al obtener la lista de garantias"});
        }
    }

    /**
     * get a specific garantia
     * @param request HTTP request
     * @param response HTTP response
     */
    public getById = async (request: Request, response: Response): Promise<void> =>{
        try {
            let entity = await this._mGarantia.getById(request.params.id);
            let list = await this._mGarantia.getAll();
            this._vGarantia.renderView(response, {list, entity});
        } catch (error) {
            console.error("Error into CGarantia > getById: " + error);
            this._vGarantia.renderView(response, {error: "Error al obtener los datos de la garantia"});
        }
    }
    
    /**
     * register a new garantia
     * @param request HTTP request
     * @param response HTTP response
     */
    public postGarantia = async (request: Request, response: Response): Promise<void> => {
        try {
            let { tipo, detalle } = request.body;
            let post = await this._mGarantia.create({tipo, detalle});
            let list = await this._mGarantia.getAll();
            this._vGarantia.renderView(response,{list, post});
        } catch (error) {
            console.log("Error into CGarantia > postGarantia", error);
            this._vGarantia.renderView(response,{error: "Error al registrar la garantia"});
        }
    }

    /**
     * update a specific  garantia
     * @param request HTTP request
     * @param response HTTP response
     */
    public putGarantia = async (request: Request, response: Response): Promise<void> => {
        try {
            let { tipo, detalle } = request.body;
            let id = request.params.id;
            let put = await this._mGarantia.update(id, {tipo, detalle});
            let list = await this._mGarantia.getAll();
            this._vGarantia.renderView(response, {list, put});
        } catch (error) {
            console.log("Error into CGarantia > putGarantia", error);
            this._vGarantia.renderView(response, {error: "Error al modificar los datos del garantia"});
        }
    }

    /**
     * delete a specific garantia
     * @param request HTTP request
     * @param response HTTP response
     */
    public deleteGarantia = async (request: Request, response: Response): Promise<void> => {
        try {
            let id = request.params.id;
            let _delete = await this._mGarantia.delete(id);
            let list = await this._mGarantia.getAll();
            this._vGarantia.renderView(response, {list, _delete});
        } catch (error) {
            console.log("Error into CGarantia > deleteGarantia", error);
            this._vGarantia.renderView(response, {error: "Error al eliminar el garantia"});
        }
    }
}
import { Request, Response } from "express";

import {MArticulo} from '../model/MArticulo';
import {VArticulo} from '../views/articulo/VArticulo';

export class CArticulo{
    private _mArticulo: MArticulo;
    private _vArticulo: VArticulo;

    /**
     * constructor
     */
    public constructor() {
        this._mArticulo = new MArticulo();
        this._vArticulo = new VArticulo();
    }

    /**
     * get the list of all articulos
     * @param request HTTP request
     * @param response HTTP response
     */
    public getList = async (request: Request, response: Response): Promise<void> =>{
        try {
            let list = await this._mArticulo.getAll();
            this._vArticulo.renderView(response, {list});
        } catch (error) {
            console.error("Error into CArticulo > getList: " + error);
            this._vArticulo.renderView(response, {error: "Error al obtener la lista de articulos"});
        }
    }

    /**
     * get a specific articulo
     * @param request HTTP request
     * @param response HTTP response
     */
    public getById = async (request: Request, response: Response): Promise<void> =>{
        try {
            let entity = await this._mArticulo.getById(request.params.id);
            let list = await this._mArticulo.getAll();
            this._vArticulo.renderView(response, {list, entity});
        } catch (error) {
            console.error("Error into CArticulo > getById: " + error);
            this._vArticulo.renderView(response, {error: "Error al obtener los datos del articulo"});
        }
    }
    
    /**
     * register a new articulo
     * @param request HTTP request
     * @param response HTTP response
     */
    public postArticulo = async (request: Request, response: Response): Promise<void> => {
        try {
            let { nombre, descripcion, precio } = request.body;
            let post = await this._mArticulo.create({nombre, descripcion, precio});
            let list = await this._mArticulo.getAll();
            this._vArticulo.renderView(response,{list, post});
        } catch (error) {
            console.log("Error into CArticulo > postArticulo", error);
            this._vArticulo.renderView(response,{error: "Error al registrar el articulo"});
        }
    }

    /**
     * update a specific  articulo
     * @param request HTTP request
     * @param response HTTP response
     */
    public putArticulo = async (request: Request, response: Response): Promise<void> => {
        try {
            let { nombre, descripcion, precio } = request.body;
            let id = request.params.id;
            let put = await this._mArticulo.update(id, {nombre, descripcion, precio});
            let list = await this._mArticulo.getAll();
            this._vArticulo.renderView(response, {list, put});
        } catch (error) {
            console.log("Error into CArticulo > putArticulo", error);
            this._vArticulo.renderView(response, {error: "Error al modificar los datos del articulo"});
        }
    }

    /**
     * delete a specific articulo
     * @param request HTTP request
     * @param response HTTP response
     */
    public deleteArticulo = async (request: Request, response: Response): Promise<void> => {
        try {
            let id = request.params.id;
            let _delete = await this._mArticulo.delete(id);
            let list = await this._mArticulo.getAll();
            this._vArticulo.renderView(response, {list, _delete});
        } catch (error) {
            console.log("Error into CArticulo > deleteArticulo", error);
            this._vArticulo.renderView(response, {error: "Error al eliminar el articulo"});
        }
    }
}
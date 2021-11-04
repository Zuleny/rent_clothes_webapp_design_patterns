import { Request, Response } from "express";

import {MLocal} from '../model/MLocal';
import {VLocal} from '../views/local/VLocal';
import {MAdministrador} from '../model/MAdministrador';
import {MInventario} from '../model/MInventario';
import { MArticulo } from "../model/MArticulo";

export class CLocal{
    private _mLocal: MLocal;
    private _vLocal: VLocal;
    private _mAdministrador: MAdministrador;
    private _mInventario: MInventario;
    private _mArticulo: MArticulo;

    /**
     * constructor
     */
    public constructor() {
        this._mLocal = new MLocal();
        this._vLocal = new VLocal();
        this._mAdministrador = new MAdministrador();
        this._mInventario = new MInventario();
        this._mArticulo = new MArticulo();
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
            this._vLocal.redirectViewInventario(response, post.codigo);
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

    /**
     * get list of inventario
     * @param request HTTP request
     * @param response HTTP response
     */
    public getListInventario = async (request: Request, response: Response): Promise<void> => {
        try {
            let codigo_local = request.params.cod_local;
            let local = await this._mLocal.getById(codigo_local);
            let inventarioList = await this._mInventario.getAll(codigo_local);
            let articuloList = await this._mArticulo.getAll();
            this._vLocal.renderViewInventario(response, {local, inventarioList, articuloList});
        } catch (error) {
            console.log("Error into CLocal > getListInventario", error);
            this._vLocal.renderView(response, {error: "Error al cargar la vista de inventarios"});
        }
    }

    /**
     * get a specific inventario
     * @param request HTTP request
     * @param response HTTP response
     */
    public getListInventarioById = async (request: Request, response: Response): Promise<void> => {
        try {
            let codigo_local = request.params.cod_local;
            let codigo_articulo = request.params.cod_articulo;
            let local = await this._mLocal.getById(codigo_local);

            let inventario = await this._mInventario.getById(codigo_local, codigo_articulo);
            let inventarioList = await this._mInventario.getAll(codigo_local);
        
            this._vLocal.renderViewInventario(response, {local, inventario, inventarioList});
        } catch (error) {
            console.log("Error into CLocal > getListInventarioById", error);
            this._vLocal.renderView(response, {error: "Error al obtener los datos del inventario"});
        }
    }

    /**
     * register a new inventario
     * @param request HTTP request
     * @param response HTTP response
     */
    public postInventario = async (request: Request, response: Response): Promise<void> => {
        try {
            let { codigo_local, codigo_articulo, stock } = request.body;
            let post = await this._mInventario.create({codigo_local, codigo_articulo, stock});
            this._vLocal.redirectViewInventario(response, codigo_local);
        } catch (error) {
            console.log("Error into CLocal > postLocal", error);
            this._vLocal.renderViewInventario(response,{error: "Error al registrar el local"});
        }
    }

    /**
     * update a specific inventario
     * @param request HTTP request
     * @param response HTTP response
     */
    public putInventario = async (request: Request, response: Response): Promise<void> => {
        try {
            let { stock } = request.body;
            let codigo_local = request.params.cod_local;
            let codigo_articulo = request.params.cod_articulo;
            let put = await this._mInventario.update(codigo_local, codigo_articulo, {stock});
            this._vLocal.redirectViewInventario(response, codigo_local);
        } catch (error) {
            console.log("Error into CLocal > putLocal", error);
            this._vLocal.renderViewInventario(response, {error: "Error al modificar los datos del inventario"});
        }
    }

    /**
     * delete a specific inventario
     * @param request HTTP request
     * @param response HTTP response
     */
    public deleteInventario = async (request: Request, response: Response): Promise<void> => {
        try {
            let codigo_local = request.params.cod_local;
            let codigo_articulo = request.params.cod_articulo;
            let _delete = await this._mInventario.delete(codigo_local, codigo_articulo);
            this._vLocal.redirectViewInventario(response, codigo_local);
        } catch (error) {
            console.log("Error into CLocal > deleteLocal", error);
            this._vLocal.renderViewInventario(response, {error: "Error al eliminar el inventario"});
        }
    }
}
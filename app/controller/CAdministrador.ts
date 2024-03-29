import { Request, Response } from "express";

import {MAdministrador} from '../model/MAdministrador';
import {VAdministrador} from '../views/administrador/VAdministrador';
import { CreateValidator } from '../services/validators/create_validator';
import { UpdateValidator } from '../services/validators/update_validator';

export class CAdministrador{
    private _mAdministrador: MAdministrador;
    private _vAdministrador: VAdministrador;

    /**
     * constructor
     */
    public constructor() {
        this._mAdministrador = new MAdministrador();
        this._vAdministrador = new VAdministrador();
    }

    /**
     * get the list of all administradores
     * @param request HTTP request
     * @param response HTTP response
     */
    public getList = async (request: Request, response: Response): Promise<void> =>{
        try {
            let list = await this._mAdministrador.getAll();
            this._vAdministrador.renderView(response, {list});
        } catch (error) {
            console.error("Error into CAdministrador > getList: " + error);
            this._vAdministrador.renderView(response, {error: "Error al obtener la lista de administradores"});
        }
    }

    /**
     * get a specific administrador
     * @param request HTTP request
     * @param response HTTP response
     */
    public getById = async (request: Request, response: Response): Promise<void> =>{
        try {
            let entity = await this._mAdministrador.getById(request.params.id);
            let list = await this._mAdministrador.getAll();
            this._vAdministrador.renderView(response, {list, entity});
        } catch (error) {
            console.error("Error into CAdministrador > getById: " + error);
            this._vAdministrador.renderView(response, {error: "Error al obtener los datos del administrador"});
        }
    }
    
    /**
     * register a new administrador
     * @param request HTTP request
     * @param response HTTP response
     */
    public postAdministrador = async (request: Request, response: Response): Promise<void> => {
        try {
            let { nombre, email, contrasenia, telefono } = request.body;
            let validator = new CreateValidator();
            if(validator.validateData({email, contrasenia, telefono})){
                let post = await this._mAdministrador.create({nombre, email, contrasenia, telefono});
                let list = await this._mAdministrador.getAll();
            this._vAdministrador.renderView(response,{list, post});
            }else{
                this._vAdministrador.renderView(response, {error: "Error: formato de email, telefono, contraseña incorrectos."});
            }
        } catch (error) {
            console.log("Error into CAdministrador > postAdministrador", error);
            this._vAdministrador.renderView(response,{error: "Error al registrar al administrador"});
        }
    }

    /**
     * update a specific  administrador
     * @param request HTTP request
     * @param response HTTP response
     */
    public putAdministrador = async (request: Request, response: Response): Promise<void> => {
        try {
            let { nombre, email, contrasenia, telefono } = request.body;
            let id = request.params.id;
            let lastContrasenia = await this._mAdministrador.getById(id);
            lastContrasenia = lastContrasenia.contrasenia;
            let validator = new UpdateValidator();
            if(validator.validateData({email, contrasenia, lastContrasenia,telefono})){
                let put = await this._mAdministrador.update(id, {nombre, email, contrasenia, telefono});
                let list = await this._mAdministrador.getAll();
                this._vAdministrador.renderView(response, {list, put});
            }else{
                this._vAdministrador.renderView(response, {error: "Error: formato de email, telefono, contraseña incorrectos. Recuerde que al cambiar de contraseña no debe usar la misma que la anterior"});
            }
        } catch (error) {
            console.log("Error into CAdministrador > putAdministrador", error);
            this._vAdministrador.renderView(response, {error: "Error al modificar los datos del administrador"});
        }
    }

    /**
     * delete a specific administrador
     * @param request HTTP request
     * @param response HTTP response
     */
    public deleteAdministrador = async (request: Request, response: Response): Promise<void> => {
        try {
            let id = request.params.id;
            let _delete = await this._mAdministrador.delete(id);
            let list = await this._mAdministrador.getAll();
            this._vAdministrador.renderView(response, {list, _delete});
        } catch (error) {
            console.log("Error into CAdministrador > deleteAdministrador", error);
            this._vAdministrador.renderView(response, {error: "Error al eliminar al administrador"});
        }
    }
}
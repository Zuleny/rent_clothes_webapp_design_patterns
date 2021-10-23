import { Request, Response } from "express";

import {MAdministrador} from '../model/MAdministrador';

export class CAdministrador{
    private _mAdministrador: MAdministrador;

    /**
     * constructor
     */
    public constructor() {
        this._mAdministrador = new MAdministrador();
    }

    /**
     * getList
     */
    public getList = async (request: Request, response: Response): Promise<void> =>{
        try {
            let list = await this._mAdministrador.getAll();
            response.render('VAdministrador', {list});
        } catch (error) {
            console.error("Error into CAdministrador > getList: " + error);
            response.render('VAdministrador', {error: "Ha ocurrido un error"});
        }

    }

    public getById = async (request: Request, response: Response): Promise<void> =>{
        try {
            let entity = await this._mAdministrador.getById(request.params.id);
            let list = await this._mAdministrador.getAll();
            response.render('VAdministrador', {list, entity});
        } catch (error) {
            console.error("Error into CAdministrador > getById: " + error);
            response.render('VAdministrador', {error: "Ha ocurrido un error"});
        }

    }
    
    public postAdministrador = async (request: Request, response: Response): Promise<void> => {
        try {
            let { nombre, email, contrasenia, telefono } = request.body;
            let post = await this._mAdministrador.create({nombre, email, contrasenia, telefono});
            let list = await this._mAdministrador.getAll();
            response.render('VAdministrador',{list,post});
        } catch (error) {
            console.log("Error into CAdministrador > postAdministrador", error);
            response.render('VAdministrador', {error: "Ha ocurrido un error"});
        }
    }

    public putAdministrador = async (request: Request, response: Response): Promise<void> => {
        try {
            let { nombre, email, contrasenia, telefono } = request.body;
            let id = request.params.id;
            let put = await this._mAdministrador.update(id, {nombre, email, contrasenia, telefono});
            let list = await this._mAdministrador.getAll();
            response.render('VAdministrador',{list, put});
        } catch (error) {
            console.log("Error into CAdministrador > putAdministrador", error);
            response.render('VAdministrador', {error: "Ha ocurrido un error"});
        }
    }

    public deleteAdministrador = async (request: Request, response: Response): Promise<void> => {
        try {
            let id = request.params.id;
            let _delete = await this._mAdministrador.delete(id);
            let list = await this._mAdministrador.getAll();
            response.render('VAdministrador',{list, _delete});
        } catch (error) {
            console.log("Error into CAdministrador > deleteAdministrador", error);
            response.render('VAdministrador', {error: "Ha ocurrido un error"});
        }
    }
}
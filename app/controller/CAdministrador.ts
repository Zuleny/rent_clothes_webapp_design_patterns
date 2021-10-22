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
    public getList = async (request: Request, response: Response): Promise<Response> =>{
        try {
            let list = await this._mAdministrador.getAll();
            return response.json(list);
        } catch (error) {
            console.error("Error into CAdministrador > getList: " + error);
            return response.status(500).json({
                status: 500,
                msg: "Error internal server"
            });
        }

    }
    
    public postAdministrador = async (request: Request, response: Response): Promise<Response> => {
        try {
            let { nombre, email, contrasenia, telefono } = request.body;
            let result = await this._mAdministrador.create({nombre, email, contrasenia, telefono})
            return response.json(result);
        } catch (error) {
            console.log("Error into CAdministrador > postAdministrador", error);
            return response.status(500).json({
                status: 500,
                msg: "Error internal server"
            });
        }
    }

    public putAdministrador = async (request: Request, response: Response): Promise<Response> => {
        try {
            let { nombre, email, contrasenia, telefono } = request.body;
            let id = request.params.id;
            let result = await this._mAdministrador.update(id, {nombre, email, contrasenia, telefono});
            return response.json(result);
        } catch (error) {
            console.log("Error into CAdministrador > putAdministrador", error);
            return response.status(500).json({
                status: 500,
                msg: "Error internal server"
            });
        }
    }

    public deleteAdministrador = async (request: Request, response: Response): Promise<Response> => {
        try {
            let id = request.params.id;
            let result = await this._mAdministrador.delete(id);
            return response.json(result);
        } catch (error) {
            console.log("Error into CAdministrador > deleteAdministrador", error);
            return response.status(500).json({
                status: 500,
                msg: "Error internal server"
            });
        }
    }
}
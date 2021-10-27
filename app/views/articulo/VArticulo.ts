import {Response} from "express";
export class VArticulo {
    /**
     * render to a specific view
     * @param response HTTP response
     * @param data data to send to html
     */
    public renderView = (response: Response, data:any):void =>{
        response.render('articulo/VArticulo', data);
    }

    /**
     * redirect to a specific route
     * @param response HTTP response
     */
    public redirectView = (response: Response): void =>{
        response.redirect('/articulo');
    }
}
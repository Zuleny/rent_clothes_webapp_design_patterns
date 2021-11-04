import {Response} from "express";
export class VLocal {
    /**
     * render to a specific view
     * @param response HTTP response
     * @param data data to send to html
     */
    public renderView = (response: Response, data:any):void =>{
        response.render('local/VLocal', data);
    }

    /**
     * redirect to a specific route
     * @param response HTTP response
     */
    public redirectView = (response: Response): void =>{
        response.redirect('/local');
    }

    /**
     * render to a specific view
     * @param response HTTP response
     * @param data data to send to html
     */
    public renderViewInventario = (response: Response, data:any):void =>{
        response.render('local/inventario', data);
    }

    /**
     * redirect to a specific route
     * @param response HTTP response
     */
    public redirectViewInventario = (response: Response, codigo_local: any): void =>{
        response.redirect(`/local/inventario/${codigo_local}`);
    }
}
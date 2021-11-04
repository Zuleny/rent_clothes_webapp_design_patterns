import {Response} from "express";
export class VNotaAlquiler {
    /**
     * render to a specific view
     * @param response HTTP response
     * @param data data to send to html
     */
    public renderView = (response: Response, data:any):void =>{
        response.render('notaalquiler/VNotaAlquiler', data);
    }

    /**
     * redirect to a specific route
     * @param response HTTP response
     */
    public redirectView = (response: Response): void =>{
        response.redirect('/notaalquiler');
    }

    /**
     * render to a specific view
     * @param response HTTP response
     * @param data data to send to html
     */
    public renderViewArticuloGarantia = (response: Response, data:any):void =>{
        response.render('notaalquiler/articulo_garantia', data);
    }

    /**
     * redirect to a specific articulo_list route
     * @param response HTTP response
     */
    public redirectViewArticuloGarantia = (response: Response, nro: any): void =>{
        response.redirect(`/notaalquiler/articulo_garantia/${nro}`);
    }
}
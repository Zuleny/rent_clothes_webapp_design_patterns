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
}
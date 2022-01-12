import { Connection } from "../../conection";
import { Devuelto } from "./devuelto";
import { Entregado } from "./entregado";
import {MNotaAlquiler_State} from "./MNotaAlquiler_State";
import { Pendiente } from "./pendiente";
import { Retrasado } from "./retrasado";

export class MNotaAlquiler{
    /**
     * Attributes
     */
     private _nro: number;
     private _concepto: string;
     private _fecha_entrega: string;
     private _fecha_devolucion: string;
     private _total: number;
     private _codigo_local: number;
     private _ci_cliente: number;
     private _estado: MNotaAlquiler_State;
     private _connection: Connection;

     /**
      * Method constructor of nota alquiler
      * @param nro unique identifier to nota alquiler
      * @param concepto name of nota alquiler
      * @param fecha_entrega fecha_entrega of nota alquiler
      * @param fecha_devolucion password of nota alquiler
      * @param total cellphone number of nota alquiler
      * @param codigo_local local's codigo_local
      * @param ci_cliente cliente's ci
      */
    public constructor(nro: number = 0,concepto:string = '', fecha_entrega: string = '', fecha_devolucion: string = '', total: number = 0.00, estado: MNotaAlquiler_State = new Pendiente(),codigo_local:number = 0, ci_cliente: number= 0) {
        this._nro = nro;
        this._concepto = concepto;
        this._fecha_entrega = fecha_entrega;
        this._fecha_devolucion = fecha_devolucion;
        this._total = total;
        this._estado = estado;
        this._codigo_local = codigo_local;
        this._ci_cliente = ci_cliente;
        this._connection = Connection.getInstance();
    }

     /**
      * get all nota alquileres
      * @returns the list of all nota alquileres
      */
     public getAll = async (): Promise<Array<any>> => {
        try {
            let list: Array<any> = (await this._connection.query('select * from notaalquiler;')).rows;
            list.forEach(nota_alquiler => {
                nota_alquiler.fecha_entrega = nota_alquiler.fecha_entrega.toLocaleDateString();
                nota_alquiler.fecha_devolucion = nota_alquiler.fecha_devolucion.toLocaleDateString();
            });
            return list;
        } catch (error) {
            console.error("Error into MNotaAlquiler > getAll: " + error);
            return [];
        }
    }

    /**
     * get all data of a specific nota alquiler
     * @param nro nota alquiler identifier to get data
     * @returns data of a nota alquiler or null if not found
     */
    public getById = async (nro: any): Promise<any | null> => {
        try {
            let entity: any = (await this._connection.query(`select * from notaalquiler where nro = ${nro};`)).rows[0];
            entity.fecha_entrega = entity.fecha_entrega.toLocaleDateString() ;
            let fechaDevolucion = entity.fecha_devolucion.toLocaleDateString();;
            const myArr = fechaDevolucion.split("/");
            entity.fecha_devolucion = `${myArr[2]}-${myArr[1]}-${myArr[0]}`;
            return entity;
        } catch (error) {
            console.error("Error into MNotaAlquiler > getById: " + error);
            return null;
        }
    }

    /**
     * create a new nota alquiler
     * @param entity new nota alquiler data object
     * @returns a created administrator data object
     */
    public create = async (entity: any): Promise<any | null> =>{
        try {
            let response: any = (await this._connection.query(`insert into notaalquiler(concepto, fecha_entrega, fecha_devolucion, total, estado, codigo_local, ci_cliente) values('${entity.concepto}', 'now()', '${entity.fecha_devolucion}', 0.00, 'P',${entity.codigo_local}, ${entity.ci_cliente}) returning*;`)).rows[0];
            response.fecha_entrega = response.fecha_entrega.toLocaleDateString();
            response.fecha_devolucion = response.fecha_devolucion.toLocaleDateString();
            this._nro = response.nro;
            this._concepto = response.concepto;
            this._fecha_entrega = response.fecha_entrega;
            this._fecha_devolucion = response.fecha_devolucion;
            this._total = response.total;
            this._codigo_local = response.codigo_local;
            this._ci_cliente = response.ci_cliente;
            return response;
        } catch (error) {
            console.error("Error into MNotaAlquiler > create: " + error);
            return null;
        }
    }

    /**
     * update a specific nota alquiler
     * @param nro nota alquiler identifier to update
     * @param data the new data to update
     * @returns an updated administrator data object
     */
    public update = async (nro: any, data: any): Promise<any> => {
        try {
            let response: any = (await this._connection.query(`update notaalquiler set concepto='${data.concepto}', fecha_devolucion='${data.fecha_devolucion}', codigo_local=${data.codigo_local}, ci_cliente=${data.ci_cliente} where nro=${nro} returning *;`)).rows[0];
            response.fecha_entrega = response.fecha_entrega.toLocaleDateString();
            response.fecha_devolucion = response.fecha_devolucion.toLocaleDateString();
            this._concepto = response.concepto;
            this._fecha_entrega = response.fecha_entrega;
            this._fecha_devolucion = response.fecha_devolucion;
            this._total = response.total;
            this._codigo_local = response.codigo_local;
            this._ci_cliente = response.ci_cliente;
            return response;
        } catch (error) {
            console.error("Error into MNotaAlquiler > update: " + error);
            return null;
        }
    }

    /**
     * update a specific nota alquiler
     * @param nro nota alquiler identifier to update
     * @param state the new data to update
     * @returns an updated administrator data object
     */
     public updateState = async (nro: any, state: any): Promise<any> => {
        try {
            
            let response: any = (await this._connection.query(`update notaalquiler set estado='${state}' where nro='${nro}'returning *;`)).rows[0];
            return response;
        } catch (error) {
            console.error("Error into MNotaAlquiler > update: " + error);
            return null;
        }
    }

    /**
     * delete a specific nota alquiler
     * @param nro nota alquiler identifier to delete
     * @returns a deleted administrator data object
     */
    public delete = async (nro: any): Promise<any> => {
        try {
            let response: any = (await this._connection.query(`delete from notaalquiler where nro=${nro} returning *;`)).rows[0];
            response.fecha_entrega = response.fecha_entrega.toLocaleDateString();
            response.fecha_devolucion = response.fecha_devolucion.toLocaleDateString();
            return response;
        } catch (error) {
            console.error("Error into MNotaAlquiler > update: " + error);
            return null;
        }
    }

    get nro() {
        return this._nro;
    }

    get concepto(){
        return this._concepto;
    }

    get fecha_entrega() {
        return this._fecha_entrega;
    }

    get fecha_devolucion() {
        return this._fecha_devolucion;
    }

    get total() {
        return this._total;
    }

    get estado(){
        return this._estado;
    }

    get codigo_local() {
        return this._codigo_local;
    }

    get ci_cliente() {
        return this._ci_cliente;
    }

    public setEstado(state: MNotaAlquiler_State) {
        this._estado = state;
    }
    
}
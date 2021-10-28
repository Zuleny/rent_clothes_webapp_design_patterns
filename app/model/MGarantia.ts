import { Connection } from "../conection";

export class MGarantia{
    /**
     * Attributes
     */
     private _codigo: number;
     private _tipo: string;
     private _detalle: string;
     private _connection: Connection;

     /**
      * Method constructor of Garantia 
      * @param codigo unique identifier to garantia 
      * @param tipo name of garantia 
      * @param detalle email of garantia 
      */
     public constructor(codigo: number = 0,tipo:string = '', detalle: string = ''){
         this._codigo = codigo;
         this._tipo = tipo;
         this._detalle = detalle;
         this._connection = Connection.getInstance();
     }

     /**
      * get all garantias
      * @returns the list of all garantias
      */
     public getAll = async (): Promise<Array<any>> => {
        try {
            let list: Array<any> = (await this._connection.query('select * from garantia;')).rows;
            return list;
        } catch (error) {
            console.error("Error into MGarantia> getAll: " + error);
            return [];
        }
    }

    /**
     * get all data of a specific garantia
     * @param id garantia identifier to get data
     * @returns data of a garantia or null if not found
     */
    public getById = async (id: any): Promise<any | null> => {
        try {
            let entity: any = (await this._connection.query(`select * from garantia where codigo = ${id};`)).rows[0];
            return entity;
        } catch (error) {
            console.error("Error into MGarantia> getById: " + error);
            return null;
        }
    }

    /**
     * create a new garantia
     * @param entity new garantia data object
     * @returns a created garantia data object
     */
    public create = async (entity: any): Promise<any | null> =>{
        try {
            let response: any = (await this._connection.query(`insert into garantia(tipo, detalle) values('${entity.tipo}', '${entity.detalle}') returning*;`)).rows[0];
            this._codigo = response.codigo;
            this._tipo = response.tipo;
            this._detalle = response.detalle;
            return response;
        } catch (error) {
            console.error("Error into MGarantia > create: " + error);
            return null;
        }
    }

    /**
     * update a specific garantia
     * @param id garantia identifier to update
     * @param data the new data to update
     * @returns an updated garantia data object
     */
    public update = async (id: any, data: any): Promise<any> => {
        try {
            let response: any = (await this._connection.query(`update garantia set tipo='${data.tipo}', detalle='${data.detalle}' where codigo=${id} returning *;`)).rows[0];
            this._tipo = response.tipo;
            this._detalle = response.detalle;
            return response;
        } catch (error) {
            console.error("Error into MGarantia > update: " + error);
            return null;
        }
    }

    /**
     * delete a specific garantia
     * @param id garantia identifier to delete
     * @returns a deleted garantia data object
     */
    public delete = async (id: any): Promise<any> => {
        try {
            let response: any = (await this._connection.query(`delete from garantia where codigo=${id} returning *;`)).rows[0];
            return response;
        } catch (error) {
            console.error("Error into MGarantia > update: " + error);
            return null;
        }
    }

    get codigo(){
        return this._codigo;
    }

    get tipo(){ 
        return this._tipo;
    }

    get detalle(){
        return this._detalle;
    }
}
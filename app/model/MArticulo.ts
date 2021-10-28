import { Connection } from "../conection";

export class MArticulo{
    /**
     * Attributes
     */
     private _codigo: number;
     private _nombre: string;
     private _descripcion: string;
     private _precio: number;
     private _connection: Connection;

     /**
      * Method constructor of Articulo 
      * @param id unique identifier to articulo 
      * @param nombre name of articulo 
      * @param descripcion email of articulo 
      * @param precio password of articulo 
      * @param telefono cellphone number of articulo 
      */
     public constructor(codigo: number = 0,nombre:string = '', descripcion: string = '', precio: number = 0.00) {
         this._codigo = codigo;
         this._nombre = nombre;
         this._descripcion = descripcion;
         this._precio = precio;
         this._connection = Connection.getInstance();
     }

     /**
      * get all articulos
      * @returns the list of all articulos
      */
     public getAll = async (): Promise<Array<any>> => {
        try {
            let list: Array<any> = (await this._connection.query('select * from articulo;')).rows;
            return list;
        } catch (error) {
            console.error("Error into MArticulo> getAll: " + error);
            return [];
        }
    }

    /**
     * get all data of a specific articulo
     * @param id articulo identifier to get data
     * @returns data of a articulo or null if not found
     */
    public getById = async (id: any): Promise<any | null> => {
        try {
            let entity: any = (await this._connection.query(`select * from articulo where codigo = ${id};`)).rows[0];
            return entity;
        } catch (error) {
            console.error("Error into MArticulo> getById: " + error);
            return null;
        }
    }

    /**
     * create a new articulo
     * @param entity new articulo data object
     * @returns a created articulo data object
     */
    public create = async (entity: any): Promise<any | null> =>{
        try {
            let response: any = (await this._connection.query(`insert into articulo(nombre, descripcion, precio) values('${entity.nombre}', '${entity.descripcion}', ${entity.precio}) returning*;`)).rows[0];
            this._codigo = response.codigo;
            this._nombre = response.nombre;
            this._descripcion = response.descripcion;
            this._precio = response.precio;
            return response;
        } catch (error) {
            console.error("Error into MArticulo > create: " + error);
            return null;
        }
    }

    /**
     * update a specific articulo
     * @param id articulo identifier to update
     * @param data the new data to update
     * @returns an updated articulo data object
     */
    public update = async (id: any, data: any): Promise<any> => {
        try {
            let response: any = (await this._connection.query(`update articulo set nombre='${data.nombre}', descripcion='${data.descripcion}', precio='${data.precio}' where codigo=${id} returning *;`)).rows[0];
            this._nombre = response.nombre;
            this._descripcion = response.descripcion;
            this._precio = response.precio;
            return response;
        } catch (error) {
            console.error("Error into MArticulo > update: " + error);
            return null;
        }
    }

    /**
     * delete a specific articulo
     * @param id articulo identifier to delete
     * @returns a deleted articulo data object
     */
    public delete = async (id: any): Promise<any> => {
        try {
            let response: any = (await this._connection.query(`delete from articulo where codigo=${id} returning *;`)).rows[0];
            return response;
        } catch (error) {
            console.error("Error into MArticulo > update: " + error);
            return null;
        }
    }

    get codigo(){
        return this._codigo;
    }
    
    get nombre(){
        return this._nombre;
    }

    get descripcion(){
        return this._descripcion;
    }

    get precio(){
        return this._precio;
    }
}
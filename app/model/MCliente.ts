import { Connection } from "../conection";

export class MCliente{
    /**
     * Attributes
     */
     private _ci: number;
     private _nombre: string;
     private _email: string;
     private _telefono: string;
     private _connection: Connection;

     /**
      * Method constructor of Cliente 
      * @param ci unique identifier to cliente 
      * @param nombre name of cliente 
      * @param email email of cliente 
      * @param telefono cellphone number of cliente 
      */
     public constructor(ci: number = 0,nombre:string = '', email: string = '', telefono: string = '') {
         this._ci = ci;
         this._nombre = nombre;
         this._email = email;
         this._telefono = telefono;
         this._connection = Connection.getInstance();
     }

     /**
      * get all clientes
      * @returns the list of all clientes
      */
     public getAll = async (): Promise<Array<any>> => {
        try {
            let list: Array<any> = (await this._connection.query('select * from Cliente;')).rows;
            return list;
        } catch (error) {
            console.error("Error into MCliente> getAll: " + error);
            return [];
        }
    }

    /**
     * get all data of a specific cliente
     * @param id cliente identifier to get data
     * @returns data of a cliente or null if not found
     */
    public getById = async (id: any): Promise<any | null> => {
        try {
            let entity: any = (await this._connection.query(`select * from Cliente where ci = ${id};`)).rows[0];
            return entity;
        } catch (error) {
            console.error("Error into MCliente> getById: " + error);
            return null;
        }
    }

    /**
     * create a new cliente
     * @param entity new cliente data object
     * @returns a created cliente data object
     */
    public create = async (entity: any): Promise<any | null> =>{
        try {
            let response: any = (await this._connection.query(`insert into Cliente(ci, nombre, email, telefono) values(${entity.ci}, '${entity.nombre}', '${entity.email}', '${entity.telefono}') returning*;`)).rows[0];
            this._ci = response.ci;
            this._nombre = response.nombre;
            this._email = response.email;
            this._telefono = response.telefono;
            return response;
        } catch (error) {
            console.error("Error into MCliente > create: " + error);
            return null;
        }
    }

    /**
     * update a specific cliente
     * @param id cliente identifier to update
     * @param data the new data to update
     * @returns an updated cliente data object
     */
    public update = async (id: any, data: any): Promise<any> => {
        try {
            let response: any = (await this._connection.query(`update Cliente set nombre='${data.nombre}', email='${data.email}', telefono='${data.telefono}' where ci=${id} returning *;`)).rows[0];
            this._nombre = response.nombre;
            this._email = response.email;
            this._telefono = response.telefono;
            return response;
        } catch (error) {
            console.error("Error into MCliente > update: " + error);
            return null;
        }
    }

    /**
     * delete a specific cliente
     * @param id cliente identifier to delete
     * @returns a deleted cliente data object
     */
    public delete = async (id: any): Promise<any> => {
        try {
            let response: any = (await this._connection.query(`delete from Cliente where ci=${id} returning *;`)).rows[0];
            return response;
        } catch (error) {
            console.error("Error into MCliente > update: " + error);
            return null;
        }
    }

    get ci(){
        return this._ci;
    }

    get nombre(){
        return this._nombre;
    }

    get email(){
        return this._email;
    }

    get telefono(){
        return this._telefono
    }
}
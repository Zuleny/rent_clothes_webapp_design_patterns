import { Connection } from "../conection";

export class MLocal{
    /**
     * Attributes
     */
    private _codigo: number;
    private _nombre: string;
    private _direccion: string;
    private _telefono: number;
    private _idAdministrador: number;
    private _connection: Connection;

    /**
      * Method constructor of Local 
      * @param id unique identifier to local 
      * @param nombre name of local 
      * @param direccion email of local  
      * @param telefono cellphone number of local 
      * @param idAdministrador the id of the administrador user
      */
    public constructor(codigo: number = 0,nombre:string = '', direccion: string = '', telefono: number = 0.00, idAdministrador: number = 0) {
        this._codigo = codigo;
        this._nombre = nombre;
        this._direccion = direccion;
        this._telefono = telefono;
        this._idAdministrador = idAdministrador;
        this._connection = Connection.getInstance();
    }

    /**
      * get all locales
      * @returns the list of all locales
      */
    public getAll = async (): Promise<Array<any>> => {
        try {
            let list: Array<any> = (await this._connection.query('select * from local;')).rows;
            return list;
        } catch (error) {
            console.error("Error into MLocal> getAll: " + error);
            return [];
        }
    }

    /**
     * get all data of a specific local
     * @param id local identifier to get data
     * @returns data of a local or null if not found
     */
    public getById = async (id: any): Promise<any | null> => {
        try {
            let entity: any = (await this._connection.query(`select * from local where codigo = ${id};`)).rows[0];
            return entity;
        } catch (error) {
            console.error("Error into MLocal> getById: " + error);
            return null;
        }
    }

    /**
     * create a new local
     * @param entity new local data object
     * @returns a created local data object
     */
    public create = async (entity: any): Promise<any | null> =>{
        try {
            let response: any = (await this._connection.query(`insert into local(nombre, direccion, telefono, id_administrador) values('${entity.nombre}', '${entity.direccion}', ${entity.telefono}, ${entity.id_administrador}) returning*;`)).rows[0];
            this._codigo = response.codigo;
            this._nombre = response.nombre;
            this._direccion = response.direccion;
            this._telefono = response.telefono;
            this._idAdministrador = response.id_administrador;
            return response;
        } catch (error) {
            console.error("Error into MLocal > create: " + error);
            return null;
        }
    }

    /**
     * update a specific local
     * @param id local identifier to update
     * @param data the new data to update
     * @returns an updated local data object
     */
    public update = async (id: any, data: any): Promise<any> => {
        try {
            let response: any = (await this._connection.query(`update local set nombre='${data.nombre}', direccion='${data.direccion}', telefono='${data.telefono}', id_administrador='${data.id_administrador}' where codigo=${id} returning *;`)).rows[0];
            this._nombre = response.nombre;
            this._direccion = response.direccion;
            this._telefono = response.telefono;
            this._idAdministrador = response.id_administrador;
            return response;
        } catch (error) {
            console.error("Error into MLocal > update: " + error);
            return null;
        }
    }

    /**
     * delete a specific local
     * @param id local identifier to delete
     * @returns a deleted local data object
     */
    public delete = async (id: any): Promise<any> => {
        try {
            let response: any = (await this._connection.query(`delete from local where codigo=${id} returning *;`)).rows[0];
            return response;
        } catch (error) {
            console.error("Error into MLocal > update: " + error);
            return null;
        }
    }

    get codigo(){
        return this._codigo;
    }

    get nombre(){
        return this._nombre;
    }

    get direccion(){
        return this._direccion;
    }

    get telefono(){
        return this._telefono;
    }

    get idAdministrador(){
        return this._idAdministrador;
    }
}
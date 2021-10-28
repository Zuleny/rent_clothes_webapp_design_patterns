import { Connection } from "../conection";

export class MAdministrador{
    /**
     * Attributes
     */
     private _id: number;
     private _nombre: string;
     private _email: string;
     private _contrasenia: string;
     private _telefono: string;
     private _connection: Connection;

     /**
      * Method constructor of Administrador
      * @param id unique identifier to administrador
      * @param nombre name of administrador
      * @param email email of administrador
      * @param contrasenia password of administrador
      * @param telefono cellphone number of administrador
      */
     public constructor(id: number = 0,nombre:string = '', email: string = '', contrasenia: string = '', telefono: string = '') {
         this._id = id;
         this._nombre = nombre;
         this._email = email;
         this._contrasenia = contrasenia;
         this._telefono = telefono;
         this._connection = Connection.getInstance();
     }

     /**
      * get all administradores
      * @returns the list of all administradores
      */
     public getAll = async (): Promise<Array<any>> => {
        try {
            let list: Array<any> = (await this._connection.query('select * from administrador;')).rows;
            return list;
        } catch (error) {
            console.error("Error into MAdministrador > getAll: " + error);
            return [];
        }
    }

    /**
     * get all data of a specific administrador
     * @param id administrador identifier to get data
     * @returns data of a administrador or null if not found
     */
    public getById = async (id: any): Promise<any | null> => {
        try {
            let entity: any = (await this._connection.query(`select * from administrador where id = ${id};`)).rows[0];
            return entity;
        } catch (error) {
            console.error("Error into MAdministrador > getById: " + error);
            return null;
        }
    }

    /**
     * create a new administrador
     * @param entity new administrador data object
     * @returns a created administrator data object
     */
    public create = async (entity: any): Promise<any | null> =>{
        try {
            let response: any = (await this._connection.query(`insert into administrador(nombre, email, contrasenia, telefono) values('${entity.nombre}', '${entity.email}', '${entity.contrasenia}', '${entity.telefono}') returning*;`)).rows[0];
            this._id = response.id;
            this._nombre = response.nombre;
            this._email = response.email;
            this._contrasenia = response.contrasenia;
            this._telefono = response.telefono;
            return response;
        } catch (error) {
            console.error("Error into MAdministrador > create: " + error);
            return null;
        }
    }

    /**
     * update a specific administrador
     * @param id administrador identifier to update
     * @param data the new data to update
     * @returns an updated administrator data object
     */
    public update = async (id: any, data: any): Promise<any> => {
        try {
            let response: any = (await this._connection.query(`update administrador set nombre='${data.nombre}', email='${data.email}', contrasenia='${data.contrasenia}', telefono='${data.telefono}' where id=${id} returning *;`)).rows[0];
            this._nombre = response.nombre;
            this._email = response.email;
            this._contrasenia = response.contrasenia;
            this._telefono = response.telefono;
            return response;
        } catch (error) {
            console.error("Error into MAdministrador > update: " + error);
            return null;
        }
    }

    /**
     * delete a specific administrador
     * @param id administrador identifier to delete
     * @returns a deleted administrator data object
     */
    public delete = async (id: any): Promise<any> => {
        try {
            let response: any = (await this._connection.query(`delete from administrador where id=${id} returning *;`)).rows[0];
            return response;
        } catch (error) {
            console.error("Error into MAdministrador > update: " + error);
            return null;
        }
    }

    get id() {
        return this._id;
    }

    get nombre(){
        return this._nombre;
    }

    get email() {
        return this._email;
    }

    get contrasenia() {
        return this._contrasenia;
    }

    get telefono() {
        return this._telefono;
    }
}
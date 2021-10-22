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

     
     public constructor(id: number = 0,nombre:string = '', email: string = '', contrasenia: string = '', telefono: string = '') {
         this._id = id;
         this._nombre = nombre;
         this._email = email;
         this._contrasenia = contrasenia;
         this._telefono = telefono;
         this._connection = Connection.getInstance();
     }

     public getAll = async (): Promise<Array<any>> => {
        try {
            let list: Array<any> = (await this._connection.query('select * from administrador;')).rows;
            return list;
        } catch (error) {
            console.error("Error into MAdministrador > getAll: " + error);
            return [];
        }
    }

    public getById = async (id: any): Promise<any | null> => {
        try {
            let entity: any = (await this._connection.query(`select * from administrador where id = ${id};`)).rows[0];
            return entity;
        } catch (error) {
            console.error("Error into MAdministrador > getById: " + error);
            return null;
        }
    }

    public create = async (entity: any): Promise<any | null> =>{
        try {
            let response: any = (await this._connection.query(`insert into administrador(nombre, email, contrasenia, telefono) values('${entity.nombre}', '${entity.email}', '${entity.contrasenia}', '${entity.telefono}') returning*;`)).rows[0];
            return response;
        } catch (error) {
            console.error("Error into MAdministrador > create: " + error);
            return null;
        }
    }

    public update = async (id: any, data: any): Promise<any> => {
        try {
            let response: any = (await this._connection.query(`update administrador set nombre='${data.nombre}', email='${data.email}', contrasenia='${data.contrasenia}', telefono='${data.telefono}' where id=${id} returning *;`)).rows[0];
            return response;
        } catch (error) {
            console.error("Error into MAdministrador > update: " + error);
            return null;
        }
    }

    public delete = async (id: any): Promise<any> => {
        try {
            let response: any = (await this._connection.query(`delete from administrador where id=${id} returning *;`)).rows[0];
            return response;
        } catch (error) {
            console.error("Error into MAdministrador > update: " + error);
            return null;
        }
    }


    get id(): number{
        return this._id;
    }

    
}
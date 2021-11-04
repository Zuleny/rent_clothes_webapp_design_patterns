import { Connection } from "../conection";

export class MInventario{
    /**
     * Attributes
     */
    private _codigo_local: number;
    private _codigo_articulo: number;
    private _stock: number;
    private _connection: Connection;

    /**
      * Method constructor of inventario 
      * @param codigo_local unique identifier to inventario 
      * @param codigo_articulo unique identifier to inventario 
      * @param stock quantity of articles
      */
    public constructor(codigo_local: number = 0, codigo_articulo:number = 0, stock: number = 0){
        this._codigo_local = codigo_local;
        this._codigo_articulo = codigo_articulo;
        this._stock = stock;
        this._connection = Connection.getInstance();
    }

    /**
      * get all inventarios
      * @returns the list of all inventarios
      */
    public getAll = async (id: any): Promise<Array<any>> => {
        try {
            let list: Array<any> = (await this._connection.query(`select i.codigo_local, i.codigo_articulo, i.stock, a.nombre, a.precio 
                                                                from inventario i , articulo a 
                                                                where i.codigo_articulo = a.codigo and i.codigo_local = ${id};`)).rows;
            return list;
        } catch (error) {
            console.error("Error into MInventario> getAll: " + error);
            return [];
        }
    }

    /**
     * get all data of a specific inventario
     * @param codigo_local inventario identifier to get data
     * @param codigo_articulo inventario identifier to get data
     * @returns data of a inventario or null if not found
     */
    public getById = async (codigo_local: any, codigo_articulo: any): Promise<any | null> => {
        try {
            let entity: any = (await this._connection.query(`select i.codigo_local, i.codigo_articulo, i.stock, a.nombre
                                                            from inventario i , articulo a 
                                                            where i.codigo_articulo = a.codigo and i.codigo_local = ${codigo_local} and i.codigo_articulo = ${codigo_articulo};`)).rows[0];
            return entity;
        } catch (error) {
            console.error("Error into MInventario> getById: " + error);
            return null;
        }
    }

    /**
     * create a new inventario
     * @param entity new inventario data object
     * @returns a created inventario data object
     */
    public create = async (entity: any): Promise<any | null> =>{
        try {
            let response: any = (await this._connection.query(`insert into Inventario(codigo_local, codigo_articulo, stock) values(${entity.codigo_local}, ${entity.codigo_articulo}, ${entity.stock}) returning*;`)).rows[0];
            this._codigo_local = response.codigo_local;
            this._codigo_articulo = response.codigo_articulo;
            this._stock = response.stock;
            return response;
        } catch (error) {
            console.error("Error into MInventario > create: " + error);
            return null;
        }
    }

    /**
     * update a specific inventario
     * @param codigo_local inventario identifier to update
     * @param data the new data to update
     * @returns an updated inventario data object
     */
    public update = async (codigo_local: any, codigo_articulo: any, data: any): Promise<any> => {
        try {
            let response: any = (await this._connection.query(`update Inventario set stock=${data.stock} where codigo_local=${codigo_local} and codigo_articulo=${codigo_articulo} returning *;`)).rows[0];
            this._codigo_articulo = response.codigo_articulo;
            this._codigo_local = response.codigo_local;
            this._stock = response.stock;
            return response;
        } catch (error) {
            console.error("Error into MInventario > update: " + error);
            return null;
        }
    }

    /**
     * delete a specific inventario
     * @param id inventario identifier to delete
     * @returns a deleted inventario data object
     */
    public delete = async (codigo_local: any, codigo_articulo: any): Promise<any> => {
        try {
            let response: any = (await this._connection.query(`delete from Inventario where codigo_local=${codigo_local} and codigo_articulo = ${codigo_articulo}returning *;`)).rows[0];
            return response;
        } catch (error) {
            console.error("Error into MInventario > update: " + error);
            return null;
        }
    }

    get codigo_local(){
        return this._codigo_local;
    }

    get codigo_articulo(){ 
        return this._codigo_articulo;
    }

    get stock(){
        return this._stock;
    }
}
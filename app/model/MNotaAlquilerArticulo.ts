import { Connection } from "../conection";

export class MNotaAlquilerArticulo{
    /**
     * Attributes
     */
    private _nro_notaalquiler: number;
    private _codigo_articulo: number;
    private _cantidad: number;
    private _connection: Connection;

    /**
      * Method constructor of nota alquiler articulo 
      * @param nro_notaalquiler unique identifier to nota alquiler articulo 
      * @param codigo_articulo name of nota alquiler articulo 
      * @param cantidad email of nota alquiler articulo 
      */
    public constructor(nro_notaalquiler: number = 0, codigo_articulo:number = 0, cantidad: number = 0){
        this._nro_notaalquiler = nro_notaalquiler;
        this._codigo_articulo = codigo_articulo;
        this._cantidad = cantidad;
        this._connection = Connection.getInstance();
    }

    /**
      * get all nota alquiler articulos
      * @returns the list of all nota alquiler articulos
      */
    public getAll = async (id: any): Promise<Array<any>> => {
        try {
            let list: Array<any> = (await this._connection.query(`select n.nro_notaalquiler ,n.codigo_articulo ,n.cantidad ,a.nombre ,a.precio 
                                                                from NotaAlquilerArticulo n, articulo a 
                                                                where n.codigo_articulo = a.codigo and n.nro_notaalquiler = ${id};`)).rows;
            return list;
        } catch (error) {
            console.error("Error into MNotaAlquilerArticulo> getAll: " + error);
            return [];
        }
    }

    /**
     * get all data of a specific nota alquiler articulo
     * @param nro_notaalquiler nota alquiler articulo identifier to get data
     * @param codigo_articulo nota alquiler articulo identifier to get data
     * @returns data of a nota alquiler articulo or null if not found
     */
    public getById = async (nro_notaalquiler: any, codigo_articulo: any): Promise<any | null> => {
        try {
            let entity: any = (await this._connection.query(`select * from NotaAlquilerArticulo where nro_notaalquiler = ${nro_notaalquiler} and codigo_articulo = ${codigo_articulo};`)).rows[0];
            return entity;
        } catch (error) {
            console.error("Error into MNotaAlquilerArticulo> getById: " + error);
            return null;
        }
    }

    /**
     * create a new nota alquiler articulo
     * @param entity new nota alquiler articulo data object
     * @returns a created nota alquiler articulo data object
     */
    public create = async (entity: any): Promise<any | null> =>{
        try {
            let response: any = (await this._connection.query(`insert into NotaAlquilerArticulo(nro_notaalquiler, codigo_articulo, cantidad) values(${entity.nro_notaalquiler}, ${entity.codigo_articulo}, ${entity.cantidad}) returning*;`)).rows[0];
            this._nro_notaalquiler = response.nro_notaalquiler;
            this._codigo_articulo = response.codigo_articulo;
            this._cantidad = response.cantidad;
            return response;
        } catch (error) {
            console.error("Error into MNotaAlquilerArticulo > create: " + error);
            return null;
        }
    }

    /**
     * update a specific nota alquiler articulo
     * @param nro_notaalquiler nota alquiler articulo identifier to update
     * @param data the new data to update
     * @returns an updated nota alquiler articulo data object
     */
    public update = async (nro_notaalquiler: any, codigo_articulo: any, data: any): Promise<any> => {
        try {
            let response: any = (await this._connection.query(`update NotaAlquilerArticulo set cantidad=${data.cantidad} where nro_notaalquiler=${nro_notaalquiler} and codigo_articulo=${codigo_articulo} returning *;`)).rows[0];
            this._codigo_articulo = response.codigo_articulo;
            this._nro_notaalquiler = response.nro_notaalquiler;
            this._cantidad = response.cantidad;
            return response;
        } catch (error) {
            console.error("Error into MNotaAlquilerArticulo > update: " + error);
            return null;
        }
    }

    /**
     * delete a specific nota alquiler articulo
     * @param id nota alquiler articulo identifier to delete
     * @returns a deleted nota alquiler articulo data object
     */
    public delete = async (nro_notaalquiler: any, codigo_articulo: any): Promise<any> => {
        try {
            let response: any = (await this._connection.query(`delete from NotaAlquilerArticulo where nro_notaalquiler=${nro_notaalquiler} and codigo_articulo = ${codigo_articulo}returning *;`)).rows[0];
            return response;
        } catch (error) {
            console.error("Error into MNotaAlquilerArticulo > update: " + error);
            return null;
        }
    }

    get nro_notaalquiler(){
        return this._nro_notaalquiler;
    }

    get codigo_articulo(){ 
        return this._codigo_articulo;
    }

    get cantidad(){
        return this._cantidad;
    }
}
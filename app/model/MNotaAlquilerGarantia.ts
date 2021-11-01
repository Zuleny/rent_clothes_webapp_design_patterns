import { Connection } from "../conection";

export class MNotaAlquilerGarantia{
    /**
     * Attributes
     */
    private _nro_notaalquiler: number;
    private _codigo_garantia: number;
    private _cantidad: number;
    private _detalle_especifico: string;
    private _connection: Connection;

    /**
      * Method constructor of nota alquiler garantia 
      * @param nro_notaalquiler unique identifier to nota alquiler garantia 
      * @param codigo_garantia name of nota alquiler garantia 
      * @param cantidad email of nota alquiler garantia 
      */
    public constructor(nro_notaalquiler: number = 0, codigo_garantia:number = 0, cantidad: number = 0, detalle_especifico:string=""){
        this._nro_notaalquiler = nro_notaalquiler;
        this._codigo_garantia = codigo_garantia;
        this._cantidad = cantidad;
        this._detalle_especifico = detalle_especifico;
        this._connection = Connection.getInstance();
    }

    /**
      * get all nota alquiler garantias
      * @returns the list of all nota alquiler garantias
      */
    public getAll = async (id: any): Promise<Array<any>> => {
        try {
            let list: Array<any> = (await this._connection.query(`select n.nro_notaalquiler, n.codigo_garantia ,n.cantidad ,n.detalle_especifico ,g.tipo
                                                                from notaalquilergarantia n, garantia g 
                                                                where n.codigo_garantia = g.codigo and n.nro_notaalquiler = ${id};`)).rows;
            return list;
        } catch (error) {
            console.error("Error into MNotaAlquilerGarantia> getAll: " + error);
            return [];
        }
    }

    /**
     * get all data of a specific nota alquiler garantia
     * @param nro_notaalquiler nota alquiler garantia identifier to get data
     * @param codigo_garantia nota alquiler garantia identifier to get data
     * @returns data of a nota alquiler garantia or null if not found
     */
    public getById = async (nro_notaalquiler: any, codigo_garantia: any): Promise<any | null> => {
        try {
            let entity: any = (await this._connection.query(`select * from NotaAlquilerGarantia where nro_notaalquiler = ${nro_notaalquiler} and codigo_garantia = ${codigo_garantia};`)).rows[0];
            return entity;
        } catch (error) {
            console.error("Error into MNotaAlquilerGarantia> getById: " + error);
            return null;
        }
    }

    /**
     * create a new nota alquiler garantia
     * @param entity new nota alquiler garantia data object
     * @returns a created nota alquiler garantia data object
     */
    public create = async (entity: any): Promise<any | null> =>{
        try {
            let response: any = (await this._connection.query(`insert into NotaAlquilerGarantia(nro_notaalquiler, codigo_garantia, cantidad, detalle_especifico) values(${entity.nro_notaalquiler}, ${entity.codigo_garantia}, ${entity.cantidad}, ${entity.detalle_especifico}) returning*;`)).rows[0];
            this._nro_notaalquiler = response.nro_notaalquiler;
            this._codigo_garantia = response.codigo_garantia;
            this._cantidad = response.cantidad;
            this._detalle_especifico = response.detalle_especifico;
            return response;
        } catch (error) {
            console.error("Error into MNotaAlquilerGarantia > create: " + error);
            return null;
        }
    }

    /**
     * update a specific nota alquiler garantia
     * @param nro_notaalquiler nota alquiler garantia identifier to update
     * @param data the new data to update
     * @returns an updated nota alquiler garantia data object
     */
    public update = async (nro_notaalquiler: any, codigo_garantia: any, data: any): Promise<any> => {
        try {
            let response: any = (await this._connection.query(`update NotaAlquilerGarantia set cantidad=${data.cantidad}, detalle_especifico='${data.detalle_especifico}' where nro_notaalquiler=${nro_notaalquiler} and codigo_garantia=${codigo_garantia} returning *;`)).rows[0];
            this._codigo_garantia = response.codigo_garantia;
            this._nro_notaalquiler = response.nro_notaalquiler;
            this._cantidad = response.cantidad;
            this._detalle_especifico = response.detalle_especifico;
            return response;
        } catch (error) {
            console.error("Error into MNotaAlquilerGarantia > update: " + error);
            return null;
        }
    }

    /**
     * delete a specific nota alquiler garantia
     * @param id nota alquiler garantia identifier to delete
     * @returns a deleted nota alquiler garantia data object
     */
    public delete = async (nro_notaalquiler: any, codigo_garantia: any): Promise<any> => {
        try {
            let response: any = (await this._connection.query(`delete from NotaAlquilerGarantia where nro_notaalquiler=${nro_notaalquiler} and codigo_garantia = ${codigo_garantia}returning *;`)).rows[0];
            return response;
        } catch (error) {
            console.error("Error into MNotaAlquilerGarantia > update: " + error);
            return null;
        }
    }

    get nro_notaalquiler(){
        return this._nro_notaalquiler;
    }

    get codigo_garantia(){ 
        return this._codigo_garantia;
    }

    get cantidad(){
        return this._cantidad;
    }

    get detalle_especifico(){
        return this._detalle_especifico;
    }
}
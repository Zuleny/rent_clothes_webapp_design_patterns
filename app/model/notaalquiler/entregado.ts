import { Devuelto } from "./devuelto";
import { MNotaAlquiler } from "./MNotaAlquiler";
import { MNotaAlquiler_State } from "./MNotaAlquiler_State";
import { Retrasado } from "./retrasado";

export class Entregado extends MNotaAlquiler_State{
    public notaAlquilerPendiente(notaAlquiler: MNotaAlquiler): boolean{
        return false;
    }
    public notaAlquilerEntregado(notaAlquiler: MNotaAlquiler): boolean{
        return false;
    }
    public notaAlquilerDevuelto(notaAlquiler: MNotaAlquiler): boolean{
        notaAlquiler.setEstado(new Devuelto());
        return true;
    }
    public notaAlquilerRetrasado(notaAlquiler: MNotaAlquiler): boolean{
        notaAlquiler.setEstado(new Retrasado());
        return true;
    }
}
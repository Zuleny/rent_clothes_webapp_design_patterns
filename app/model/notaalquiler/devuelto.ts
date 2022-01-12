import { MNotaAlquiler } from "./MNotaAlquiler";
import { MNotaAlquiler_State } from "./MNotaAlquiler_State";

export class Devuelto extends MNotaAlquiler_State{
    public notaAlquilerPendiente(notaAlquiler: MNotaAlquiler): boolean {
        return false;
    }
    public notaAlquilerEntregado(notaAlquiler: MNotaAlquiler): boolean{
        return false;
    }
    public notaAlquilerDevuelto(notaAlquiler: MNotaAlquiler): boolean {
        return false;
    }
    public notaAlquilerRetrasado(notaAlquiler: MNotaAlquiler): boolean {
        return false;
    }
}
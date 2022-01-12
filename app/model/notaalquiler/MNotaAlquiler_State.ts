import { MNotaAlquiler } from "./MNotaAlquiler";

export abstract class MNotaAlquiler_State {
    public abstract notaAlquilerPendiente(notaAlquiler: MNotaAlquiler): boolean;
    public abstract notaAlquilerEntregado(notaAlquiler: MNotaAlquiler): boolean;
    public abstract notaAlquilerDevuelto(notaAlquiler: MNotaAlquiler): boolean;
    public abstract notaAlquilerRetrasado(notaAlquiler: MNotaAlquiler): boolean;
    
}
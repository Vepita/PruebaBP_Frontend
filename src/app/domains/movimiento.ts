import { Cuenta } from './cuenta';
export class Movimiento {
    
    cuenta: Cuenta;
    fecha: Date;
    tipoMovimiento: string;
    valor: number;
    saldo: number;
    estado: string;
}

export class Characteristic {
    id: number;
    nombre: string;
}

export class Pleasure {
    id: number;
    nombre: string;
    tipoCaracteristicaCliente: Characteristic = new Characteristic();
}
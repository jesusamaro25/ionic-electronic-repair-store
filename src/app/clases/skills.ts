
export class EquipmentType {
    id: number;
    nombre: string;
}

export  class ServicesType {
    id: number;
    nombre: string;
}

export class Activities {
    id: number;
    nombre: string;
    descripcion: string  ;
    costo: number;
}

export class Offer {
    id: number;
    nombre: string;
    porcentaje: number;
}

export class Promotions {
    id: number;
    nombre: string;
    descripcion: string;
    fechaInicio: string;
    fechaExpiracion: string;
    urlImagen: string;
    descuento: Offer = new Offer();           
}

export class Skills {
    id: number;
    descripcion: string;
    urlImagen: string;
    tipoEquipo: EquipmentType = new EquipmentType();
    tipoServicio: ServicesType = new ServicesType();
    actividades: Activities = new Activities();
    promociones: Array < Promotions > = new Array < Promotions >();
}
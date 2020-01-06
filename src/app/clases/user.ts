export class User {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    direccion: string;
    telefono: string;
    fechaNacimiento: any;
    sexo: string;
    urlFoto: string;
    documentoIdentidad: string;
    rol:number;
    token:string;

    constructor() {
       this.id= 0;
       this.nombre= "";
       this.apellido=""; 
       this.correo=""; 
       this.direccion=""; 
       this.telefono=""; 
       this.fechaNacimiento=""; 
       this.sexo=""; 
       this.urlFoto=""; 
       this.documentoIdentidad=""; 
       this.rol=0; 
       this.token=""; 
    }
    }
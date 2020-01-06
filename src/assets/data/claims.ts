import { Claims } from 'src/app/clases/claims';

export const CLA: Claims[] =
[       
    {
      "id" : 1,
      "modelo": "PS4",
      "descripcion" : " Fallas en el software la cual no permite la correcta funcionalidad del equipo.",
      "estado": "Pendiente por aprobar"
    },
  
     {   
        "id" : 2,
        "modelo": "S3",
        "descripcion": "Después de la reparación el chat no agararra señal ",
        "estado": "Rechazado"
    },
    {
        "id" : 3,
        "modelo": "N8",
        "descripcion": "Luego de la reparación el dispositivo se recalienta",
        "estado": "Aprobado"
    }
]
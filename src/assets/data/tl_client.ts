import { Timeline_Client } from 'src/app/clases/timeline_client';
 
export const TLC: Timeline_Client[] = 
[
    {
        'id_equipo': 1,
        'id_tl': 111,
        'act_equip': [{
            'id': 0,
            'a_equip': "Se hizo la recepción del equipo",
            'fecha': '15/07/2019',
            'estatus': 'Finalizado'
        },
        {
            'id': 1,
            'a_equip': "Se comenzó la revisión del equipo",
            'fecha': '15/07/2019',
            'estatus': 'Finalizado'
        },
        {
            'id': 2,
            'a_equip': "Se hizo el diagnóstico del equipo",
            'fecha': '15/07/2019',
            'estatus': 'Finalizado'
        },
        {
            'id': 3,
            'a_equip': "El cliente aprobó el presupuesto. Se comenzó la reparación del equipo",
            'fecha': '16/07/2019',
            'estatus': 'Finalizado'
        },
        {
            'id': 4,
            'a_equip': "Se realizó el cambio de la mica",
            'fecha': '16/07/2019',
            'estatus': 'Finalizado'
        },
        {
            'id': 5,
            'a_equip': "Se entregó  el equipo",
            'fecha': '15/07/2019',
            'estatus': 'Entregado'
        }
    ]
    },
    {
        'id_equipo': 2,
        'id_tl': 222,
        'act_equip': [{
            'id': 6,
            'a_equip': "Se hizo la recepción del equipo",
            'fecha': '16/07/2019',
            'estatus': 'Finalizado'
        },
        {
            'id': 7,
            'a_equip': "Se comenzó la revisión del equipo",
            'fecha': '16/07/2019',
            'estatus': 'Finalizado'
        },
        {
            'id': 8,
            'a_equip': "Se hizo el diagnóstico del equipo.",
            'fecha': '17/07/2019',
            'estatus': 'Finalizado'
        },
        {
            'id': 9,
            'a_equip': "En espera de la aprobación de presupuesto del cliente",
            'fecha': '17/07/2019',
            'estatus': 'Pendiente'
        }
    ],
    },
    {
        'id_equipo': 3,
        'id_tl': 333,
        'act_equip': [{
            'id': 10,
            'a_equip': "El equipo llegó a la oficina", 
            'fecha': '01/08/2019',
            'estatus': 'Finalizado'
        },
        {
            'id': 11,
            'a_equip': "Se comenzó la revisión del equipo",
            'fecha': '03/08/2019',
            'estatus': 'Finalizado'
        },
        {
            'id': 12,
            'a_equip': "En espera del diagnóstico del equipo",
            'fecha': '03/08/2019',
            'estatus': 'Pendiente'
        }
    ]
    },
    {
        'id_equipo': 4,
        'id_tl': 444,
        'act_equip': [{
            'id': 13,
            'a_equip': "Se hizo la recepción del equipo", 
            'fecha': '06/08/2019',
            'estatus': 'Finalizado'
        },
        {
            'id': 14,
            'a_equip': "Se comenzó la revisión del equipo",
            'fecha': '7/08/2019',
            'estatus': 'Pendiente'
        }]
    },
    {
        'id_equipo': 5,
        'id_tl': 555,
        'act_equip': [{
            'id': 15,
            'a_equip': "Se hizo la recepción del equipo", 
            'fecha': '11/08/2019',
            'estatus': 'Finalizado'
        },
        {
            'id': 16,
            'a_equip': "Se comenzó la revisión del equipo",
            'fecha': '11/08/2019',
            'estatus': 'Pendiente'
        }]
    },
    {
        'id_equipo': 6,
        'id_tl': 666,
        'act_equip': [
            {
                'id': 13,
                'a_equip': "Se hizo la recepción del equipo", 
                'fecha': '11/08/2019',
                'estatus': 'Finalizado'
            },
            {
                'id': 14,
                'a_equip': "Se comenzó la revisión del equipo",
                'fecha': '12/08/2019',
                'estatus': 'Pendiente'
            }
        ]
    }
]
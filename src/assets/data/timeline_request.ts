import { TimelineRequest } from 'src/app/clases/timeline_request';
 
export const TLR: TimelineRequest[] = 
[
    {
        'id': 1,
        'id_equipo': 111,
        'act_solicitud': [
            {
                'id': 0,
                'a_solicitud': 'Se hizo la solicitud del equipo.',
                'fecha': '13/08/2019'
            }
        ],
    },
    {
        'id': 2,
        'id_equipo': 222,
        'act_solicitud': [
            {
                'id': 1,
                'a_solicitud': 'Se hizo la solicitud del equipo.',
                'fecha': '10/08/2019'
            },
            {
                'id': 2,
                'a_solicitud': 'La solicitud fue rechazada.',
                'fecha': '11/08/2019'
            }
            ],
    },
    {
        'id': 3,
        'id_equipo': 333,
        'act_solicitud': [
            {
                'id': 3,
                'a_solicitud': 'La solicitud fue rechazada.',
                'fecha': '7/08/2019'
            }
        ],
    },
    {
        'id': 4,
        'id_equipo': 444,
        'act_solicitud': [
            {
                'id': 4,
                'a_solicitud': 'Se hizo la solicitud del equipo.',
                'fecha': '12/08/2019'
            },
            {
                'id': 5,
                'a_solicitud': 'La solicitud fue aprobada.',
                'fecha': '13/08/2019'
            }
        ],
    },
    {
        'id': 5,
        'id_equipo': 555,
        'act_solicitud': [
            {
            'id': 6,
            'a_solicitud': 'Se hizo la solicitud del equipo.',
            'fecha': '11/08/2019'
            }
        ]
    },
    {
        'id': 6,
        'id_equipo': 666,
        'act_solicitud': [  
            {
                'id': 7,
                'a_solicitud': 'Se hizo la solicitud del equipo.',
                'fecha': '10/08/2019'
            },
            {
                'id': 8,
                'a_solicitud': 'La solicitud fue rechazada.',
                'fecha': '10/08/2019'
            }
        ],
    },
]
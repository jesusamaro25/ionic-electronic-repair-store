import { Budget } from 'src/app/clases/budgets';
 
export const BUDGET: Budget[] =
    [
        {
            "id": 1,
            "marca": "Sony",
            "modelo": "PS4",
            "cliente": "Donai Torin",
            "descripcion": "La consola no enciende",
            "diagnostico": "Fuente de poder dañado por el calor, requiere reemplazo"
        },
        {
            "id": 2,
            "marca": "Samsung",
            "modelo": "J8",
            "cliente": "Luis Gomez",
            "descripcion": "Pantalla partida",
            "diagnostico": "Pantalla totalmente partida, requiere de reemplazo"
        },
        {
            "id": 3,
            "marca": "COMPAC",
            "modelo": "JAH32",
            "cliente": "Jesus Amaro",
            "descripcion": "Placa quemada",
            "diagnostico": "La placa esta quedamada debido a un alto voltaje de energía electrica recibido, requiere reemplazo"
        },
        {
            "id": 4,
            "marca": "Motorola",
            "modelo": "Moto G4",
            "cliente": "Ana Margarita",
            "descripcion": "Pin de carga dañado",
            "diagnostico": "No recibe señales eléctricas, requiere reemplazo"
        }
    ]
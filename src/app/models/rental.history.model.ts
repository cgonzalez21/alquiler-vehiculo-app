

export class RentalHistoryModel {

    id: string;
    marca: string;
    modelo: string;
    disponible: boolean;
    personas: number;
    puertas: number;

    constructor() {
        this.disponible = true;
    }

}


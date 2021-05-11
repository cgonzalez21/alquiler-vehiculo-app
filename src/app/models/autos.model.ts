

export class AutosModel {

    id: string;
    marca: string;
    modelo: string;
    disponible: boolean;
    personas: number;
    puertas: number;
    img?: string;

    constructor() {
        this.disponible = true;
    }

}


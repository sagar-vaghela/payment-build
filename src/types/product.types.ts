
export type Description = {
    pt_PT: string;
    en_EN: string;
    es_ES: string;
}

export type ProductDocType = 'pago' | 'gratis'

export type Product = {
    prettyLink: string;
    totalvendido?: number;
    fechaalta: number;
    suscripciones: any[];
    clicks: number;
    pronosticos: any[];
    nombre: Description;
    order: number;
    cupon: string;
    descuentocupon: number | null;
    slugCheck: string;
    eliminado: boolean;
    fechacadText: string;
    fechacad?: Date;
    tipsterUid: string;
    tipo_docid: ProductDocType;
    precio: number;
    ventas: number;
    enlace: string;
    uid: string;
    descripcion: Description;
    slug: string;
    pronosticosSel: any[];
    visible: boolean;
    cuponcaducidadText: string | null;
    cuponcaducidad?: Date;
    suscripcionesSel: any[];
    numNewsClients: number;
    conversion: number | null;
}
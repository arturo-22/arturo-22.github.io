export interface IProducto {
    id: number,
    nombre?: string,
    presentacion?: string,
    unidad?: string,
    categoria?: string,
    laboratorio?: string,
    proveedor?: string,
    precioCompra?: number,
    precioVenta?: number,
    fechaCreacion?: Date,
    fechaActualizacion?: Date
}
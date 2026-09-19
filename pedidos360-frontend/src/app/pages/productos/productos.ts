import { Component, inject, signal } from '@angular/core';
import { Producto, ProductoService } from '../../core/services/producto.service';

@Component({
  selector: 'app-productos',
  imports: [],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {

  private readonly productoService = inject(ProductoService);

  productos = signal<Producto[]>([]);
  cargando = signal(true);
  error = signal('');

  constructor() {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando.set(true);
    this.error.set('');

    this.productoService.listar().subscribe({
      next: (productos) => {
        this.productos.set(productos);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
        this.error.set('No se pudieron cargar los productos.');
        this.cargando.set(false);
      }
    });
  }
}
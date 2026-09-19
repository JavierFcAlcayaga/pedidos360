import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../../core/services/producto.service';

@Component({
  selector: 'app-nuevo-producto',
  imports: [FormsModule],
  templateUrl: './nuevo-producto.html',
  styleUrl: './nuevo-producto.css'
})
export class NuevoProducto {

  private readonly productoService = inject(ProductoService);
  private readonly router = inject(Router);

  nombre = '';
  descripcion = '';
  precio = 0;
  stock = 0;

  guardando = signal(false);
  error = signal('');

  guardar(): void {

    this.guardando.set(true);
    this.error.set('');

    this.productoService.crear({
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      stock: this.stock
    }).subscribe({
      next: () => {
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        console.error('Error al crear producto:', err);
        this.error.set('No se pudo crear el producto.');
        this.guardando.set(false);
      }
    });
  }
}
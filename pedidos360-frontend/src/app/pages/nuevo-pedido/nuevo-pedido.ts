import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PedidoService } from '../../core/services/pedido.service';

@Component({
  selector: 'app-nuevo-pedido',
  imports: [FormsModule],
  templateUrl: './nuevo-pedido.html',
  styleUrl: './nuevo-pedido.css'
})
export class NuevoPedido {

  private readonly pedidoService = inject(PedidoService);
  private readonly router = inject(Router);

  cliente = '';
  descripcion = '';
  total = 0;

  guardando = signal(false);
  error = signal('');

  guardar(): void {

    this.guardando.set(true);
    this.error.set('');

    this.pedidoService.crear({
      cliente: this.cliente,
      descripcion: this.descripcion,
      total: this.total
    }).subscribe({
      next: () => {
        this.router.navigate(['/pedidos']);
      },
      error: (err) => {
        console.error('Error al crear pedido:', err);
        this.error.set('No se pudo crear el pedido.');
        this.guardando.set(false);
      }
    });
  }
}
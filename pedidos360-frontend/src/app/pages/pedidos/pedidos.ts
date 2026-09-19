import { Component, inject, signal } from '@angular/core';
import { Pedido, PedidoService } from '../../core/services/pedido.service';

@Component({
  selector: 'app-pedidos',
  imports: [],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedidos {

  private readonly pedidoService = inject(PedidoService);

  pedidos = signal<Pedido[]>([]);
  cargando = signal(true);
  error = signal('');

  constructor() {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.cargando.set(true);
    this.error.set('');

    this.pedidoService.listar().subscribe({
      next: (pedidos) => {
        this.pedidos.set(pedidos);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al obtener pedidos:', err);
        this.error.set('No se pudieron cargar los pedidos.');
        this.cargando.set(false);
      }
    });
  }

  eliminar(id: number | undefined): void {
    if (id === undefined) {
      return;
    }

    this.pedidoService.eliminar(id).subscribe({
      next: () => {
        this.cargarPedidos();
      },
      error: (err) => {
        console.error('Error al eliminar pedido:', err);
        this.error.set('No se pudo eliminar el pedido.');
      }
    });
  }

}
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../auth/auth.config';

export interface Pedido {
  id?: number;
  cliente: string;
  descripcion: string;
  total: number;
  estado?: string;
  fechaCreacion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private readonly http = inject(HttpClient);
  private readonly url = `${API_BASE_URL}/pedidos`;

  listar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.url);
  }

  crear(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.url, pedido);
  }

  actualizar(id: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.url}/${id}`, pedido);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
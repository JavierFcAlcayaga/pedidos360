package com.pedidos360.rabbitadmin;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.stereotype.Service;

@Service
public class RabbitAdminService {
    private final RabbitAdmin admin;
    public RabbitAdminService(RabbitAdmin admin) { this.admin = admin; }
    public void crearCola(String nombre) { admin.declareQueue(QueueBuilder.durable(nombre).build()); }
    public void eliminarCola(String nombre) { admin.deleteQueue(nombre); }
    public void crearExchange(String nombre) { admin.declareExchange(new DirectExchange(nombre, true, false)); }
    public void eliminarExchange(String nombre) { admin.deleteExchange(nombre); }
    public void crearBinding(String cola, String exchange, String clave) {
        admin.declareBinding(new Binding(cola, Binding.DestinationType.QUEUE, exchange, clave, null));
    }
    public void eliminarBinding(String cola, String exchange, String clave) {
        admin.removeBinding(new Binding(cola, Binding.DestinationType.QUEUE, exchange, clave, null));
    }
}

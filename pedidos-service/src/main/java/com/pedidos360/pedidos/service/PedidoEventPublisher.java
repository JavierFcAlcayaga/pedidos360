package com.pedidos360.pedidos.service;

import com.pedidos360.pedidos.config.RabbitConfig;
import com.pedidos360.pedidos.model.Pedido;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class PedidoEventPublisher {
    private static final Logger log = LoggerFactory.getLogger(PedidoEventPublisher.class);
    private final RabbitTemplate rabbitTemplate;
    public PedidoEventPublisher(RabbitTemplate rabbitTemplate) { this.rabbitTemplate = rabbitTemplate; }
    public void publicar(Pedido pedido) {
        String mensaje = pedido.getId() + "|" + pedido.getCliente();
        try {
            rabbitTemplate.convertAndSend(RabbitConfig.EXCHANGE, RabbitConfig.ROUTING_KEY, mensaje);
            log.info("Evento pedido.creado publicado para pedido {}", pedido.getId());
        } catch (RuntimeException ex) {
            // No se revierte el pedido por fallo de la notificacion asincrona.
            log.error("Pedido {} guardado, pero no se pudo publicar su evento", pedido.getId(), ex);
        }
    }
}

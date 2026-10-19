package com.pedidos360.productos.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.core.AcknowledgeMode;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {
    public static final String EXCHANGE = "pedidos360.eventos";
    public static final String QUEUE = "pedidos360.notificaciones";
    public static final String ROUTING_KEY = "pedido.creado";
    public static final String DLX = "pedidos360.dlx";
    public static final String DLQ = "pedidos360.notificaciones.dlq";
    public static final String DEAD_ROUTING_KEY = "pedido.fallido";

    @Bean public DirectExchange pedidosExchange() { return new DirectExchange(EXCHANGE, true, false); }
    @Bean public DirectExchange deadLetterExchange() { return new DirectExchange(DLX, true, false); }
    @Bean public Queue notificacionesQueue() {
        return QueueBuilder.durable(QUEUE).deadLetterExchange(DLX).deadLetterRoutingKey(DEAD_ROUTING_KEY).build();
    }
    @Bean public Queue deadLetterQueue() { return QueueBuilder.durable(DLQ).build(); }
    @Bean public Binding pedidosBinding() { return BindingBuilder.bind(notificacionesQueue()).to(pedidosExchange()).with(ROUTING_KEY); }
    @Bean public Binding deadBinding() { return BindingBuilder.bind(deadLetterQueue()).to(deadLetterExchange()).with(DEAD_ROUTING_KEY); }
    @Bean public SimpleRabbitListenerContainerFactory manualAckContainerFactory(ConnectionFactory connectionFactory) {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setAcknowledgeMode(AcknowledgeMode.MANUAL);
        factory.setDefaultRequeueRejected(false);
        return factory;
    }
}

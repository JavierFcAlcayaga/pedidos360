package com.pedidos360.productos.messaging;

import com.pedidos360.productos.config.RabbitConfig;
import com.rabbitmq.client.Channel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
public class PedidoNotificacionListener {
    private static final Logger log = LoggerFactory.getLogger(PedidoNotificacionListener.class);

    @RabbitListener(queues = RabbitConfig.QUEUE, containerFactory = "manualAckContainerFactory")
    public void recibir(Message message, Channel channel) throws IOException {
        long tag = message.getMessageProperties().getDeliveryTag();
        String evento = new String(message.getBody(), StandardCharsets.UTF_8);
        try {
            if (evento.contains("FALLAR")) throw new IllegalArgumentException("Fallo de prueba controlado");
            log.info("NOTIFICACION: pedido creado: {}", evento);
            channel.basicAck(tag, false);
        } catch (Exception error) {
            log.error("Mensaje fallido, enviado a DLQ: {}", evento, error);
            channel.basicNack(tag, false, false);
        }
    }
}

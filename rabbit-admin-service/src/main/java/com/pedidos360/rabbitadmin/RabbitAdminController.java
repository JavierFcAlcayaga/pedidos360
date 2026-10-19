package com.pedidos360.rabbitadmin;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class RabbitAdminController {
    private final RabbitAdminService service;
    public RabbitAdminController(RabbitAdminService service) { this.service = service; }
    public record NameRequest(@NotBlank String name) {}
    public record BindingRequest(@NotBlank String queue, @NotBlank String exchange, @NotBlank String routingKey) {}

    @PostMapping("/queues") public ResponseEntity<String> crearCola(@Valid @RequestBody NameRequest dto) {
        service.crearCola(dto.name()); return ResponseEntity.ok("Cola creada"); }
    @DeleteMapping("/queues/{name}") public ResponseEntity<Void> eliminarCola(@PathVariable String name) {
        service.eliminarCola(validar(name)); return ResponseEntity.noContent().build(); }
    @PostMapping("/exchanges") public ResponseEntity<String> crearExchange(@Valid @RequestBody NameRequest dto) {
        service.crearExchange(dto.name()); return ResponseEntity.ok("Exchange creado"); }
    @DeleteMapping("/exchanges/{name}") public ResponseEntity<Void> eliminarExchange(@PathVariable String name) {
        service.eliminarExchange(validar(name)); return ResponseEntity.noContent().build(); }
    @PostMapping("/bindings") public ResponseEntity<String> crearBinding(@Valid @RequestBody BindingRequest dto) {
        service.crearBinding(dto.queue(), dto.exchange(), dto.routingKey()); return ResponseEntity.ok("Binding creado"); }
    @DeleteMapping("/bindings") public ResponseEntity<Void> eliminarBinding(@Valid @RequestBody BindingRequest dto) {
        service.eliminarBinding(dto.queue(), dto.exchange(), dto.routingKey()); return ResponseEntity.noContent().build(); }
    private String validar(String value) {
        if (value == null || value.isBlank()) throw new IllegalArgumentException("El nombre es obligatorio");
        return value;
    }
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> badRequest(IllegalArgumentException e) { return ResponseEntity.badRequest().body(e.getMessage()); }
}

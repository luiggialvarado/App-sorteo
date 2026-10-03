package com.example.sorteo;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/premios")
public class PremioController {

    @Autowired
    private PremioRepository repositorio;

    // POST /premios  -> guarda un premio nuevo
    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Premio premio) {
        if (premio.getNombre() == null || premio.getNombre().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("El nombre no puede estar vacío");
        }
        premio.setId(null); // por si el front manda un id, siempre se crea uno nuevo
        Premio guardado = repositorio.save(premio);
        return ResponseEntity.ok(guardado);
    }

    // GET /premios/ganador  -> devuelve un premio al azar
    @GetMapping("/ganador")
    public ResponseEntity<?> ganador() {
        List<Premio> premios = repositorio.findAll();

        if (premios.isEmpty()) {
            return ResponseEntity.status(404).body("No hay premios guardados");
        }

        Random random = new Random();
        int posicion = random.nextInt(premios.size());
        return ResponseEntity.ok(premios.get(posicion));
    }
}
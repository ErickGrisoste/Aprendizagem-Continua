package com.aep2.Aprendizagem.Continua.controller;

import com.aep2.Aprendizagem.Continua.model.Administrador;
import com.aep2.Aprendizagem.Continua.service.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/administrador")
@CrossOrigin("*")
public class AdministradorController {

    @Autowired
    private AdministradorService administradorService;

    @PostMapping
    public ResponseEntity<Administrador> salvarAdministrador(@RequestBody Administrador novoAdministrador){
        return ResponseEntity.status(HttpStatus.CREATED).body(administradorService.salvarAdministrador(novoAdministrador));
    }

    @GetMapping
    public ResponseEntity<List<Administrador>> listarAdministrador(){
        return ResponseEntity.ok(administradorService.listarAdministrador());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Administrador> buscarAdministradorPorId(@PathVariable Long id){
        return ResponseEntity.ok(administradorService.buscarAdministradorPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Administrador> editarAdministrador(@PathVariable Long id, @RequestBody Administrador administrador){
        return ResponseEntity.ok(administradorService.editarAdministrador(id, administrador));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Administrador> deletarAdministrador(@PathVariable Long id){
        administradorService.deletarAdiministrador(id);
        return ResponseEntity.noContent().build();
    }
}

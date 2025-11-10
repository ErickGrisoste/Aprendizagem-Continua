package com.aep2.Aprendizagem.Continua.controller;

import com.aep2.Aprendizagem.Continua.model.Material;
import com.aep2.Aprendizagem.Continua.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/material")
@CrossOrigin("*")
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @PostMapping
    public ResponseEntity<Material> salvarMaterial(@RequestBody Material novoMaterial){
        return ResponseEntity.status(HttpStatus.CREATED).body(materialService.salvarMaterial(novoMaterial));
    }

    @GetMapping
    public ResponseEntity<List<Material>> listarMateriais(){
        return ResponseEntity.ok(materialService.listarMateriais());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Material> buscarMaterialPorId(@PathVariable Long id){
        return ResponseEntity.ok(materialService.buscarMaterialPorId(id));
    }

    @GetMapping("/disciplina/{disciplinaId}")
    public ResponseEntity<List<Material>> listarPorDisciplina(@PathVariable Long disciplinaId) {
        return ResponseEntity.ok(materialService.buscarPorDisciplina(disciplinaId));
    }


    @PutMapping("/{id}")
    public ResponseEntity<Material> editarMaterial(@PathVariable Long id, @RequestBody Material material){
        return ResponseEntity.ok(materialService.editarMaterial(id, material));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletarMaterial(@PathVariable Long id){
        materialService.deletarMaterial(id);
        return ResponseEntity.noContent().build();
    }

}

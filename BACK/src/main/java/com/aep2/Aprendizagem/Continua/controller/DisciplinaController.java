package com.aep2.Aprendizagem.Continua.controller;


import com.aep2.Aprendizagem.Continua.model.Disciplina;
import com.aep2.Aprendizagem.Continua.service.DisciplinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/disciplina")
@CrossOrigin("*")
public class DisciplinaController {

    @Autowired
    private DisciplinaService disciplinaService;

    @PostMapping
    public ResponseEntity<Disciplina> salvarDisciplina(@RequestBody Disciplina novaDisciplina){
        return ResponseEntity.status(HttpStatus.CREATED).body(disciplinaService.salvarDisciplina(novaDisciplina));
    }

    @GetMapping
    public ResponseEntity<List<Disciplina>> listarDisciplinas(){
        return ResponseEntity.ok(disciplinaService.listarDiciplinas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Disciplina> buscarDisciplinaPorId(@PathVariable Long id){
        return ResponseEntity.ok(disciplinaService.buscarDisciplinaPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Disciplina> editarDisciplina(@PathVariable Long id, @RequestBody Disciplina disciplina){
        return ResponseEntity.ok(disciplinaService.editarDisciplina(id, disciplina));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletarDisciplina(@PathVariable Long id){
        disciplinaService.deletarDisciplina(id);
        return ResponseEntity.noContent().build();
    }
}

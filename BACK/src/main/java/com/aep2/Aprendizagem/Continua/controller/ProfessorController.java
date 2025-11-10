package com.aep2.Aprendizagem.Continua.controller;

import com.aep2.Aprendizagem.Continua.model.Aluno;
import com.aep2.Aprendizagem.Continua.model.Professor;
import com.aep2.Aprendizagem.Continua.service.ProfessorService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/professor")
@CrossOrigin("*")
public class ProfessorController {

    @Autowired
    private ProfessorService professorService;

    @PostMapping
    public ResponseEntity<Professor> salvarProfessor(@RequestBody Professor novoProfessor){
        return ResponseEntity.status(HttpStatus.CREATED).body(professorService.salvarProfessor(novoProfessor));
    }

    @GetMapping
    public ResponseEntity<List<Professor>> listarProfessor(){
        return ResponseEntity.ok(professorService.listarProfessor());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Professor> buscarProfessorPorId(@PathVariable Long id){
        return ResponseEntity.ok(professorService.buscarProfessorPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Professor> editarProfessor(@PathVariable Long id, @RequestBody Professor professor){
        return ResponseEntity.ok(professorService.editarProfessor(id, professor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletarProfessor(@PathVariable Long id){
        professorService.deletarProfessor(id);
        return ResponseEntity.noContent().build();
    }
}

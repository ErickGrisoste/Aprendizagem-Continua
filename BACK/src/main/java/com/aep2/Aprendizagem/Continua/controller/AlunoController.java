package com.aep2.Aprendizagem.Continua.controller;

import com.aep2.Aprendizagem.Continua.model.Aluno;
import com.aep2.Aprendizagem.Continua.service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/aluno")
@CrossOrigin("*")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @PostMapping
    public ResponseEntity<Aluno> salvarAluno(@RequestBody Aluno novoAluno){
        return ResponseEntity.status(HttpStatus.CREATED).body(alunoService.salvarAluno(novoAluno));
    }

    @GetMapping
    public ResponseEntity<List<Aluno>> listarAluno(){
        return ResponseEntity.ok(alunoService.listarAluno());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aluno> buscarAlunoPorId(@PathVariable Long id){
        return ResponseEntity.ok(alunoService.buscarAlunoPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aluno> editarAluno(@PathVariable Long id, @RequestBody Aluno aluno){
        return ResponseEntity.ok(alunoService.editarAluno(id, aluno));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Aluno> deletarAluno(@PathVariable Long id){
        alunoService.deletarAluno(id);
        return ResponseEntity.noContent().build();
    }
}

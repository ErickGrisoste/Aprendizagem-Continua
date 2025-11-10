package com.aep2.Aprendizagem.Continua.service;

import com.aep2.Aprendizagem.Continua.model.Professor;
import com.aep2.Aprendizagem.Continua.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    public Professor salvarProfessor(Professor novoProfessor){
        return professorRepository.save(novoProfessor);
    }

    public List<Professor> listarProfessor(){
        return professorRepository.findAll();
    }

    public Professor buscarProfessorPorId(Long id){
        return professorRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Nenhum professor encontrado com o id: " + id));
    }

    public Professor editarProfessor(Long id, Professor professor){
        Professor professorEditado = buscarProfessorPorId(id);

        professorEditado.setNome(professor.getNome());
        professorEditado.setRA(professor.getRA());

        return professorRepository.save(professorEditado);
    }

    public void deletarProfessor(Long id){
        Professor professorDeletado = buscarProfessorPorId(id);
        professorRepository.delete(professorDeletado);
    }
}

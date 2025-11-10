package com.aep2.Aprendizagem.Continua.service;

import com.aep2.Aprendizagem.Continua.model.Disciplina;
import com.aep2.Aprendizagem.Continua.repository.DisciplinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DisciplinaService {

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    public Disciplina salvarDisciplina(Disciplina novaDisciplina){
        return disciplinaRepository.save(novaDisciplina);
    }

    public List<Disciplina> listarDiciplinas(){
        return disciplinaRepository.findAll();
    }

    public Disciplina buscarDisciplinaPorId(Long id){
        return disciplinaRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Nenhuma disciplina encontrada com id: " + id));
    }

    public Disciplina editarDisciplina(Long id, Disciplina disciplina){
        Disciplina disciplinaEditada = buscarDisciplinaPorId(id);

        disciplinaEditada.setNome(disciplina.getNome());
        disciplinaEditada.setProfessor(disciplina.getProfessor());
        disciplinaEditada.setMateriais(disciplina.getMateriais());

        return disciplinaRepository.save(disciplinaEditada);
    }

    public void deletarDisciplina(Long id){
        Disciplina disciplinaDeletada = buscarDisciplinaPorId(id);
        disciplinaRepository.delete(disciplinaDeletada);
    }

}

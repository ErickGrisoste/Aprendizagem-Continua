package com.aep2.Aprendizagem.Continua.service;

import com.aep2.Aprendizagem.Continua.model.Aluno;
import com.aep2.Aprendizagem.Continua.repository.AlunoRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlunoService {

    @Autowired
    private AlunoRespository alunoRespository;

    public Aluno salvarAluno(Aluno novoAluno){
        return alunoRespository.save(novoAluno);
    }

    public List<Aluno> listarAluno(){
        return alunoRespository.findAll();
    }

    public Aluno buscarAlunoPorId(Long id){
        return alunoRespository.findById(id).
                orElseThrow(() -> new RuntimeException("Nenhum aluno encontrado com o id: " + id));
    }

    public Aluno editarAluno(Long id, Aluno aluno){
        Aluno alunoEditado = buscarAlunoPorId(id);

        alunoEditado.setNome(aluno.getNome());
        alunoEditado.setRA(aluno.getRA());

        return alunoRespository.save(alunoEditado);
    }

    public void deletarAluno(Long id){
        Aluno alunoDeletado = buscarAlunoPorId(id);
        alunoRespository.delete(alunoDeletado);
    }
}

package com.aep2.Aprendizagem.Continua.service;

import com.aep2.Aprendizagem.Continua.model.Administrador;
import com.aep2.Aprendizagem.Continua.model.Disciplina;
import com.aep2.Aprendizagem.Continua.repository.AdministradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdministradorService {

    @Autowired
    private AdministradorRepository administradorRepository;

    public Administrador salvarAdministrador(Administrador novoAdministrador){
        return administradorRepository.save(novoAdministrador);
    }

    public List<Administrador> listarAdministrador(){
        return administradorRepository.findAll();
    }

    public Administrador buscarAdministradorPorId(Long id){
        return administradorRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Nenhum administrador encontrado com o id: " + id));
    }

    public Administrador editarAdministrador(Long id, Administrador administrador){
        Administrador administradorEditado = buscarAdministradorPorId(id);

        administradorEditado.setNome(administrador.getNome());

        return administradorRepository.save(administradorEditado);
    }

    public void deletarAdiministrador(Long id){
        Administrador administradorDeletado = buscarAdministradorPorId(id);
        administradorRepository.delete(administradorDeletado);
    }
}

package com.aep2.Aprendizagem.Continua.service;

import com.aep2.Aprendizagem.Continua.model.Material;
import com.aep2.Aprendizagem.Continua.repository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialService {

    @Autowired
    private MaterialRepository materialRepository;

    public Material salvarMaterial(Material novoMaterial){
        return materialRepository.save(novoMaterial);
    }

    public List<Material> listarMateriais(){
        return materialRepository.findAll();
    }

    public Material buscarMaterialPorId(Long id){
        return materialRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Nenhum material encontrado com id: " + id));
    }

    public Material editarMaterial(Long id, Material material){
        Material materialEditado = buscarMaterialPorId(id);

        materialEditado.setDescricao(material.getDescricao());
        materialEditado.setDisciplina(material.getDisciplina());
        materialEditado.setTipo(material.getTipo());
        materialEditado.setUrl(material.getUrl());
        materialEditado.setTitulo(material.getTitulo());

        return materialRepository.save(materialEditado);
    }

    public void deletarMaterial(Long id){
        Material materialDeletado = buscarMaterialPorId(id);
        materialRepository.delete(materialDeletado);
    }

    public List<Material> buscarPorDisciplina(Long disciplinaId) {
        return materialRepository.findByDisciplinaDisciplinaId(disciplinaId);
    }


}

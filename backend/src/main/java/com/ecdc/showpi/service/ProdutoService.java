package com.ecdc.showpi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecdc.showpi.domain.Produto;
import com.ecdc.showpi.persistence.ProdutoRepository;

@Service
public class ProdutoService {

    @Autowired
    ProdutoRepository repository;

    public Iterable<Produto> listAll() {
        return repository.findAll();
    }
    
    public Produto update(Produto produto) throws Exception {
        if (repository.findById(produto.getId()).isPresent()) {
            return repository.save(produto);
        } else 
            throw new Exception(String.format("Produto %d não existe", produto.getId()));
    }
    
    public void delete(Long id) throws Exception {
        if (repository.findById(id).isPresent()) {
            repository.deleteById(id);
        } else 
            throw new Exception(String.format("Produto %d não existe", id));
    }

}

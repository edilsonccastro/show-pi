package com.ecdc.showpi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecdc.showpi.domain.Produto;
import com.ecdc.showpi.service.ProdutoService;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoService service;

    @GetMapping
    public Iterable<Produto> listAll() {
        return service.listAll();
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody Produto produto) {
        try {
            return ResponseEntity.ok(service.update(produto));
        }
        catch (Exception exception) {
            return ResponseEntity.badRequest()
                .body(exception.getMessage());
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteProduct(@RequestParam Long id) {
        service.delete(id);
        return ResponseEntity.ok("Product deleted");
    }

}

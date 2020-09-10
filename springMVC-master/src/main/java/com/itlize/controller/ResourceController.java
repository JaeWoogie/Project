package com.itlize.controller;

import com.itlize.entity.Resources;
import com.itlize.service.ResourceServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ResourceController {
    @Autowired
    private ResourceServiceInterface resourceService;

    @GetMapping("/resource")
    public List<Resources> getAllResources(){
        return resourceService.getResources();
    }
}

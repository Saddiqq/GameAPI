package com.example.GameAPI.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/player")
public class PlayerController {

@PostMapping
    public Player  getHomePathMessage() {
        return "MY HOME PAGE";
    }


}
package com.example.GameAPI.Controller;

import com.example.GameAPI.Models.Player;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping(path = "/api/v1/player")
@CrossOrigin("*")
public class PlayerController {

    CopyOnWriteArrayList<Player> listOfPlayers = new CopyOnWriteArrayList<>();

    // Endpoint for creating a new player
    @PostMapping
    public Player creatPlayer(@RequestBody Player incomingPlayer){
        listOfPlayers.add(incomingPlayer);
        return incomingPlayer;
    }

    // Endpoint for retrieving all players
    @GetMapping
    public List<Player> getAllPLayers(){
        return listOfPlayers;
    }

    // Endpoint for retrieving a specific player by ID
    @GetMapping(path = "/{id}")
    public Player getSpecificPlayer(@PathVariable String id){
        Player existingPlayer = listOfPlayers.stream().filter(
                (currPlayer) -> currPlayer.getId().equals(id)
        ).findFirst().orElse(null);
        return existingPlayer;
    }


    // Endpoint for updating a specific player by ID
    @PutMapping(path = "/{id}")
    public Player updateSpecificPlayer(@PathVariable String id, @RequestBody Player incomingPlayer){
        Player existingPlayer = getSpecificPlayer(id);
        if (existingPlayer != null) {
            existingPlayer.setName(incomingPlayer.getName());
        }
        return existingPlayer;
    }

    // Endpoint for removing a specific player by ID
    @DeleteMapping(path = "/{id}")
    public Player removePlayer(@PathVariable String id){
        Player existingPlayer = getSpecificPlayer(id);
        listOfPlayers.remove(existingPlayer);
        return existingPlayer;
    }
}

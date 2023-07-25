package com.example.GameAPI.Models;

public class Player {
    private String id; // Change the access modifier to private
    private String name; // Change the access modifier to private
    private int score;

    // Getters and setters for id, name, and score
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
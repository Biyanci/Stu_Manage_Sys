package com.example.stumanagesys;

public class Student {
    public int id;
    public String password;

    public String name;
    public double math;
    public double english;
    public double physics;

    public Student(int id, String password, String name, double math, double english, double physics) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.math = math;
        this.english = english;
        this.physics = physics;
    }
}

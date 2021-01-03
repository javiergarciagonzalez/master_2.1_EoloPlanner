package es.sanguino.planner.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class Eoloplant implements Serializable {

    private int id;
    private String city;
    private int progress = 0;
    private String planning;

    public Eoloplant(@JsonProperty("id") int id,
                     @JsonProperty("city") String city) {
        this.id = id;
        this.city = city;
        this.planning = city;
    }

    public int getId() {
        return id;
    }

    public String getCity() {
        return city;
    }

    public int getProgress() {
        return progress;
    }

    public void advanceProgress() {
        this.progress += 25;
        this.progress = Math.min(this.progress, 100);
    }

    public boolean getCompleted() {
        return this.progress == 100;
    }

    public void addPlanning(String str) {
        if (!this.getCompleted())
            this.planning += '-' + str;
    }

    public String getPlanning() {
        if (!this.getCompleted())
            return null;

        if (this.planning.matches("^[A-Ma-m].*"))
            return this.planning.toLowerCase();

        return this.planning.toUpperCase();
    }

    @Override
    public String toString() {
        return "Eoloplant{" +
                "id=" + id +
                ", city='" + city + '\'' +
                ", progress=" + progress +
                ", completed='" + getCompleted() + '\'' +
                ", planning='" + getPlanning() + '\'' +
                '}';
    }
}

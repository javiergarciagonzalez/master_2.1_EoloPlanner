package es.sanguino.planner;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class Eoloplant implements Serializable {

    private int id;
    private String city;
    private int progress = 0;
    private String weather;
    private String landscape;

    public Eoloplant(@JsonProperty("id") int id,
                     @JsonProperty("city") String city) {
        this.id = id;
        this.city = city;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getProgress() {
        return progress;
    }

    public void advanceProgress() {
        this.progress += 25;
        this.progress = Math.min(this.progress, 100);
    }

    public void setWeather(String weather) {
        this.weather = weather;
    }

    public void setLandscape(String landscape) {
        this.landscape = landscape;
    }

    public boolean getCompleted() {
        return this.progress == 100;
    }

    public String getPlanning() {
        return this.city + '-' + this.weather + '-' + this.landscape;
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

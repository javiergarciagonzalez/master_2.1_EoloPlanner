package es.sanguino.topo.service;

import es.sanguino.topo.model.City;
import es.sanguino.topo.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import javax.annotation.PostConstruct;

@Service
public class InitializerDataService {

    @Autowired
    private CityRepository cityRepository;

    @PostConstruct
    public void init() {

        this.cityRepository.deleteAll();

        Flux<City> cities = Flux.just(
                new City("Madrid", "Flat"),
                new City("Barcelona", "Flat"),
                new City("Jaca", "Mountain"),
                new City("Andorra", "Mountain"),
                new City("Valencia", "Flat"),
                new City("Sevilla", "Montain"),
                new City("Zaragoza", "Flat"),
                new City("Málaga", "Montain"),
                new City("Murcia", "Flat"),
                new City("Palma", "Montain"),
                new City("Bilbao", "Flat"),
                new City("Alicante", "Montain"),
                new City("Córdoba", "Flat"),
                new City("Valladolid", "Montain"),
                new City("Vigo", "Flat"),
                new City("Gijón ", "Montain"),
                new City("Vitoria", "Flat")
        );

        cities.flatMap(this.cityRepository::save).blockLast();
    }

}

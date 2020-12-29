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
                new City("Andorra", "Mountain")
        );

        cities.flatMap(this.cityRepository::save).blockLast();
    }

}

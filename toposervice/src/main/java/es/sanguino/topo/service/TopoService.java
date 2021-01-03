package es.sanguino.topo.service;

import es.sanguino.topo.model.City;
import es.sanguino.topo.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.Random;

@Service
public class TopoService {

    @Autowired
    private CityRepository cityRepository;

    public Mono<City> getCity(String id) {
        try {
            Thread.sleep(1000 + new Random().nextInt(2000));
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return this.cityRepository.findByIdIgnoreCase(id)
                .switchIfEmpty(
                        Mono.error(new ResponseStatusException(
                                HttpStatus.NOT_FOUND, "City with id " + id + " not found")));
    }
}

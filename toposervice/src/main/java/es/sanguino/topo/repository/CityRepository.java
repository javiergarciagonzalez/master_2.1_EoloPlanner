package es.sanguino.topo.repository;

import es.sanguino.topo.model.City;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface CityRepository extends ReactiveCrudRepository<City, Long> {

    Mono<City> findByIdIgnoreCase(String id);
}
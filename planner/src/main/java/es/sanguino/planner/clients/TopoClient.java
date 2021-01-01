package es.sanguino.planner.clients;

import es.sanguino.planner.models.LandscapeResponse;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.CompletableFuture;

@Component
public class TopoClient {

    @Async
    public CompletableFuture<String> getLandscape(String city) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8080/api/topographicdetails/" + city;
        LandscapeResponse response = restTemplate.getForObject(url, LandscapeResponse.class);
        return CompletableFuture.completedFuture(response.getLandscape());
    }
}

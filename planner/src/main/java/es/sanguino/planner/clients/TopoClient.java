package es.sanguino.planner.clients;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.Serializable;
import java.util.concurrent.CompletableFuture;

@Component
public class TopoClient {

    class LanscapeResponse implements Serializable {
        public String id;
        public String landscape;
    }

    @Async
    public CompletableFuture<String> getLandscape(String city) {

        System.out.println("topoooooo1111");
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("topoooooo2222 -> " + city);
        String url = "http://localhost:8080/api/topographicdetails/" + city;
        System.out.println("topoooooo3333 -> " + url);
        LanscapeResponse response = restTemplate.getForObject(url, LanscapeResponse.class);
        System.out.println("topoooooo4444 -> " + response.landscape);
        return CompletableFuture.completedFuture(response.landscape);
    }
}

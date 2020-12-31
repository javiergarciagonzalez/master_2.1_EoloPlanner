package es.sanguino.planner.clients;

import es.sanguino.grpc.GetWeatherRequest;
import es.sanguino.grpc.Weather;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

import static es.sanguino.grpc.WeatherServiceGrpc.*;

@Component
public class WeatherClient {

    //@GrpcClient("helloServer")
    private WeatherServiceBlockingStub client;

    @Async
    public CompletableFuture<String> getWeather(String city) {

          GetWeatherRequest request = GetWeatherRequest.newBuilder()
                .setCity("madrid")
                .build();

        Weather response = client.getWeather(request);

        System.out.println("Response received from server:\n" + response);

        return CompletableFuture.completedFuture("result");
    }
}
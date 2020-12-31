package es.sanguino.planner.clients;

import es.sanguino.grpc.GetWeatherRequest;
import es.sanguino.grpc.Weather;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

import static es.sanguino.grpc.WeatherServiceGrpc.WeatherServiceBlockingStub;

@Component
public class WeatherClient {

    @GrpcClient("weatherServer")
    private WeatherServiceBlockingStub client;

    @Async
    public CompletableFuture<String> getWeather(String city) {

        GetWeatherRequest request = GetWeatherRequest.newBuilder()
                .setCity(city)
                .build();

        Weather response = this.client.getWeather(request);

        return CompletableFuture.completedFuture(response.getWeather());
    }
}
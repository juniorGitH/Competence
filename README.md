package com.example.weather;
import com.example.weather.WeatherItem;

import java.util.ArrayList;
import java.util.List;

public class WeatherForecast {
    private String locationTitle;
    private String locationLink;
    private String locationDescription;
    private List<WeatherItem> weatherItems;

    public WeatherForecast() {
        weatherItems = new ArrayList<>();
    }

    public String getLocationTitle() {
        return locationTitle;
    }

    public void setLocationTitle(String locationTitle) {
        this.locationTitle = locationTitle;
    }

    public String getLocationLink() {
        return locationLink;
    }

    public void setLocationLink(String locationLink) {
        this.locationLink = locationLink;
    }

    public String getLocationDescription() {
        return locationDescription;
    }

    public void setLocationDescription(String locationDescription) {
        this.locationDescription = locationDescription;
    }

    public List<WeatherItem> getWeatherItems() {
        return weatherItems;
    }

    public void addWeatherItem(WeatherItem weatherItem) {
        weatherItems.add(weatherItem);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Location: ").append(locationTitle).append("\n");
        sb.append("Link: ").append(locationLink).append("\n");
        sb.append("Description: ").append(locationDescription).append("\n");
        sb.append("Weather Forecast:\n");
        for (WeatherItem item : weatherItems) {
            sb.append(item.toString()).append("\n");
        }
        return sb.toString();
    }
}

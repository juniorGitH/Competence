package com.example.weather;

public class WeatherItem {
    private String title;
    private String link;
    private String description;
    private String pubDate;
    private String guid;
    private String geoPoint;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPubDate() {
        return pubDate;
    }

    public void setPubDate(String pubDate) {
        this.pubDate = pubDate;
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    public String getGeoPoint() {
        return geoPoint;
    }

    public void setGeoPoint(String geoPoint) {
        this.geoPoint = geoPoint;
    }

    @Override
    public String toString() {
        return "Title: " + title + "\n" +
                "Link: " + link + "\n" +
                "Description: " + description + "\n" +
                "Publication Date: " + pubDate + "\n" +
                "GUID: " + guid + "\n" +
                "Geographical Point: " + geoPoint;
    }
}


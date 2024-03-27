package com.example.weather;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.net.URL;

public class WeatherParser {

    public static WeatherForecast parseXML(String xmlData) {
        WeatherForecast forecast = new WeatherForecast();

        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(new URL(xmlData).openStream());

            Element rss = document.getDocumentElement();
            Element channel = (Element) rss.getElementsByTagName("channel").item(0);

            // Extracting channel information
            forecast.setLocationTitle(getValue(channel, "title"));
            forecast.setLocationLink(getValue(channel, "link"));
            forecast.setLocationDescription(getValue(channel, "description"));

            // Extracting weather items
            NodeList itemList = channel.getElementsByTagName("item");
            for (int i = 0; i < itemList.getLength(); i++) {
                Element item = (Element) itemList.item(i);
                WeatherItem weatherItem = new WeatherItem();
                weatherItem.setTitle(getValue(item, "title"));
                weatherItem.setLink(getValue(item, "link"));
                weatherItem.setDescription(getValue(item, "description"));
                weatherItem.setPubDate(getValue(item, "pubDate"));
                weatherItem.setGuid(getValue(item, "guid"));
                weatherItem.setGeoPoint(getValue(item, "georss:point"));
                forecast.addWeatherItem(weatherItem);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return forecast;
    }

    private static String getValue(Element element, String tagName) {
        NodeList nodeList = element.getElementsByTagName(tagName);
        if (nodeList != null && nodeList.getLength() > 0) {
            return nodeList.item(0).getTextContent();
        }
        return "";
    }

    public static void main(String[] args) {
        String xmlData = "https://weather-broker-cdn.api.bbci.co.uk/en/forecast/rss/3day/2643123";
        WeatherForecast forecast = parseXML(xmlData);
        System.out.println(forecast);
    }
}


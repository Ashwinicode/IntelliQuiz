package com.News.newsApi.controller;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.ArrayList;
import java.util.List;

@RestController
public class TimeAPIController {

    @GetMapping("/latest-stories")
    public ResponseEntity<List<String>> getLatestStories() {
        try {
            // Send a GET request to the Time.com URL and parse the HTML with Jsoup
            Document doc = Jsoup.connect("https://time.com").get();

            // Find the elements containing the latest stories (adjust the selector as needed)
            Elements storyElements = doc.select(".headline");

            // Extract the story headlines into a list
            List<String> latestStories = new ArrayList<>();
            for (Element storyElement : storyElements) {
                latestStories.add(storyElement.text());
            }

            // Return the latest stories (up to 6, or fewer if there are fewer available)
            return ResponseEntity.ok(latestStories.subList(0, Math.min(6, latestStories.size())));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

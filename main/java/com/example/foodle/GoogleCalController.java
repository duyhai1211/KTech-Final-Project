package com.example.foodle;

import com.google.api.client.auth.oauth2.AuthorizationCodeRequestUrl;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.client.util.Value;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Events;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import jdk.jfr.Event;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class GoogleCalController {
    private static final Log logger = LogFactory.getLog(GoogleCalController.class);
    private static final String APPLICATION_NAME = "";
    private static HttpTransport httpTransport;
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static Calendar client;
    GoogleClientSecrets clientSecrets;
    GoogleAuthorizationCodeFlow flow;
    Credential credential;
    @Value("${google.client.client-id}")
    private String clientId;
    @Value("${google.client.client-secret}")
    private String clientSecret;
    @Value("${google.client.redirectUri}")
    private String redirectURI;
    private Set<Event> events = new HashSet();
    final DateTime date1 = new DateTime("2024-10-10T16:30:00.000+05:30");
    final DateTime date2 = new DateTime(new Date());

    public GoogleCalController() {
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    @RequestMapping(
            value = {"/login/google"},
            method = {RequestMethod.GET}
    )
    public RedirectView googleConnectionStatus(HttpServletRequest request) throws Exception {
        return new RedirectView(this.authorize());
    }

    @RequestMapping(
            value = {"/login/google"},
            method = {RequestMethod.GET},
            params = {"code"}
    )
    public ResponseEntity<String> oauth2Callback(@RequestParam("code") String code) {
        String message;
        try {
            TokenResponse response = this.flow.newTokenRequest(code).setRedirectUri(this.redirectURI).execute();
            this.credential = this.flow.createAndStoreCredential(response, "userID");
            client = (new Calendar.Builder(httpTransport, JSON_FACTORY, this.credential)).setApplicationName("").build();
            Calendar.Events events = client.events();
            Events eventList = (Events)events.list("primary").setTimeMin(this.date1).setTimeMax(this.date2).execute();
            message = eventList.getItems().toString();
            System.out.println("My:" + eventList.getItems());
        } catch (Exception var6) {
            logger.warn("Exception while handling OAuth2 callback (" + var6.getMessage() + "). Redirecting to google connection status page.");
            message = "Exception while handling OAuth2 callback (" + var6.getMessage() + "). Redirecting to google connection status page.";
        }

        System.out.println("cal message:" + message);
        return new ResponseEntity(message, HttpStatus.OK);
    }

    private String authorize() throws Exception {
        if (this.flow == null) {
            GoogleClientSecrets.Details web = new GoogleClientSecrets.Details();
            web.setClientId(this.clientId);
            web.setClientSecret(this.clientSecret);
            this.clientSecrets = (new GoogleClientSecrets()).setWeb(web);
            httpTransport = GoogleNetHttpTransport.newTrustedTransport();
            this.flow = (new GoogleAuthorizationCodeFlow.Builder(httpTransport, JSON_FACTORY, this.clientSecrets, Collections.singleton("https://www.googleapis.com/auth/calendar"))).build();
        }

        AuthorizationCodeRequestUrl authorizationUrl = this.flow.newAuthorizationUrl().setRedirectUri(this.redirectURI);
        System.out.println("cal authorizationUrl->" + authorizationUrl);
        return authorizationUrl.build();
    }
}



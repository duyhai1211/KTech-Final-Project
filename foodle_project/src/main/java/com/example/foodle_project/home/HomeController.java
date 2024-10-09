package com.example.foodle_project.home;

import jakarta.servlet.http.HttpSession;
import lombok.Generated;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {
    private final HttpSession httpSession;

    @RequestMapping(
            value = {"/home"},
            method = {RequestMethod.GET}
    )
    public String home(Model model) {
        model.addAttribute("testString", "this if from controller");
        return "home";
    }

    @Generated
    public HomeController(final HttpSession httpSession) {
        this.httpSession = httpSession;
    }
}

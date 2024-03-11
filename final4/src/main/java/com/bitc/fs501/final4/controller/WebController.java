package com.bitc.fs501.final4.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
    @GetMapping(value = {"/chatbot", "/shopping", "/qna"})
    public String forward() {
        return "forward:/index.html";
    }
}

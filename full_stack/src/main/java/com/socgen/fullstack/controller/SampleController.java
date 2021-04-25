package com.socgen.fullstack.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SampleController {

	@RequestMapping("/hello")
	public String greet() {
		return "Hello";
	}
	
	
}

package com.itlize.controller;

import com.itlize.entity.Resources;
import com.itlize.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import com.itlize.service.UserServiceInterface;

import java.util.List;

@RestController
public class AppController {
    @Autowired
    private UserServiceInterface userService;

    @GetMapping("/user")
    public List<Users> getAllUsers() {
        return userService.getUsers();
    }

//    @RequestMapping("/login")
//    public String login(@RequestParam("username")String name,
//                        @RequestParam("password")String pass,
//                        Model model)
//    {
//
//        List< User > theUsers = userService.getUsers();
//
//        String desireName="";
//        String desirePass="";
//        for(User u : theUsers ) {
//            desireName = u.getUsername();
//            desirePass = u.getPassword();
//            System.out.println(name);
//            System.out.println(pass);
//            if (name.equals(desireName) && pass.equals(desirePass)) {
//                System.out.println("name = dname");
//                    return "welcome";
//            }
//        }
//        System.out.println("me here");
//        return "error";
//
//    }

}

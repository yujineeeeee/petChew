package com.bitc.fs501.final4.controller;

import com.bitc.fs501.final4.dto.AnimalDto;
import com.bitc.fs501.final4.dto.UserDto;
import com.bitc.fs501.final4.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

//@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(UserDto UserDto) {
        try {
            userService.registerUser(UserDto);
            return ResponseEntity.ok("통신성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("통신에러");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(UserDto userDto, HttpSession session) {
        if (userService.authenticateUser(userDto)) {
            // 로그인 성공 시 세션에 사용자 정보 저장
            session.setAttribute("loggedInUser", userDto.getId());
            return new ResponseEntity<>("로그인 성공", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("잘못된 자격 증명", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.removeAttribute("loggedInUser");
        return new ResponseEntity<>("로그아웃 성공", HttpStatus.OK);
    }

    //로그인 상태 확인 엔드포인트
    @GetMapping("/checkLogin")
    public ResponseEntity<?> checkLoginStatus(HttpSession session) {
        // 세션에서 로그인 사용자 정보 가져오기
        Object loggedInUser = session.getAttribute("loggedInUser");

        if (loggedInUser != null) {
            // 로그인된 사용자가 있을 경우
            return ResponseEntity.ok().body(Map.of("loggedIn", true, "userId", loggedInUser));
        } else {
            // 로그인된 사용자가 없을 경우
            return ResponseEntity.ok().body(Map.of("loggedIn", false));
        }
    }

    @GetMapping("/getuserprofile")
    public ResponseEntity<UserDto> getUserById(@RequestParam("id") String userId) {
        UserDto userDto = userService.getUserById(userId);

        if (userDto != null) {
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getaniprofile")
    public ResponseEntity<AnimalDto> getAnimalByUserId(@RequestParam("id") String userId) {
        AnimalDto animalDto = userService.getAnimalByUserId(userId);

        if (animalDto != null) {
            return new ResponseEntity<>(animalDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/insertprofile")
    public ResponseEntity<String> insertprofile(UserDto userDto) {
        try {
            userService.insertProfile(userDto);
            return ResponseEntity.ok("통신성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("통신에러");
        }
    }

    @PostMapping("/insertaniprofile")
    public ResponseEntity<String> insertaniprofile(AnimalDto animalDto) {
        try {
            userService.insertAniprofile(animalDto);
            return ResponseEntity.ok("통신성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("통신에러");
        }
    }
}

package com.bitc.fs501.final4.controller;

import com.bitc.fs501.final4.dto.PostDto;
import com.bitc.fs501.final4.dto.UserDto;
import com.bitc.fs501.final4.service.ProfileService;
import com.bitc.fs501.final4.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class ProfileController {

    private final ProfileService profileService;
    private final S3Service s3Service;

    @GetMapping("/selectUser")
    public Object selectUser(@RequestParam("userId") String userId) throws Exception {
        Map<String, Object> result = new HashMap<>();

        UserDto userInfo = profileService.selectUser(userId);

        result.put("result", "success");
        result.put("data", userInfo);

        return result;
    }

    @PostMapping("/updateUserInfo")
    public Object updateUserInfo(@RequestPart List<MultipartFile> multipartFile, @RequestPart("userInfo")UserDto userInfo) throws Exception{
        Map<String, Object> result = new HashMap<>();

//        기존 프로필 사진 파일 삭제
        String originalUrl = userInfo.getProfileImg();
        s3Service.deleteImage(originalUrl);

//        프로필사진 url로 받아서 userDto에 넣기
        List<String> insertImageUrl = s3Service.uploadImage(multipartFile);
        userInfo.setProfileImg(insertImageUrl.get(0));

        profileService.updateUserInfo(userInfo);

        result.put("result", "success");

        return result;
    }

    @GetMapping("/selectProfilePost")
    public Object selectProfilePost(@RequestParam int postIdx) throws Exception{
        Map<String, Object> result = new HashMap<>();

        PostDto post = profileService.selectProfilePost(postIdx);

        result.put("result", "success");
        result.put("data", post);


        return result;
    }


}

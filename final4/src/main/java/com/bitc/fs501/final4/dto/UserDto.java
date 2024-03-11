package com.bitc.fs501.final4.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserDto {
    private String id;
    private String password;
    private String createDate;
    private String gu;
    private String profileImg;
    private String interestsTag;

    private AnimalDto animalList;
    private List<PostDto> postList;
}



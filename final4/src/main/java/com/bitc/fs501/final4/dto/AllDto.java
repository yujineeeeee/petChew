package com.bitc.fs501.final4.dto;

import lombok.Data;

@Data
public class AllDto {
    private int postIdx;
    private String postId;
    private String postDate;
    private String postContent;
    private String postTag;
    private int postHitCnt;
    private int fileIdx;
    private String filePostId;
    private int filePostIdx;
    private String fileAddress;
    private String id;
    private String password;
    private String createDate;
    private String gu;
    private String profileImg;
    private String interestsTag;
}

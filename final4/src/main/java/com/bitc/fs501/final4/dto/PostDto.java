package com.bitc.fs501.final4.dto;

import lombok.Data;

import java.util.List;

@Data
public class PostDto {
    private int postIdx;
    private String postId;
    private String postDate;
    private String postContent;
    private String postTag;
    private int postHitCnt;

    private List<PostFileDto> fileList;
//    private List<PostCommentDto> commentList;
    private List<CmtDto> cmtList;
}

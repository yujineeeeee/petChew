package com.bitc.fs501.final4.service;

import com.bitc.fs501.final4.dto.AllDto;
import com.bitc.fs501.final4.dto.CmtDto;
import com.bitc.fs501.final4.dto.PostDto;
import com.bitc.fs501.final4.dto.PostFileDto;

import java.util.List;

public interface PostService {
    //    전체 게시물 리스트
    List<PostDto> selectPostList(String interestsTag) throws Exception;

    //    태그로 검색된 게시물 리스트
    List<PostDto> selectPostByTag(String searchTag) throws Exception;

    //    게시물 등록
    void insertPost(PostDto postDto, List<String> insertImageUrl) throws Exception;

    //    업로드한 파일 url 리스트
    List<PostFileDto> selectPostFileList(int postIdx) throws Exception;

    List<CmtDto> selectCmtList(int postIdx) throws Exception;
    //    게시물 삭제
    void deletePost(int postIdx) throws Exception;


//    ----------------------------------------------------------------
    List<AllDto> postout() throws Exception;

    void posting(PostDto postDto) throws Exception;

    void insertComment(CmtDto cmtDto);

    void deleteCmt(CmtDto cmtDto);
}

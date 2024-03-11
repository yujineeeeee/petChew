package com.bitc.fs501.final4.mapper;

import com.bitc.fs501.final4.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostMapper {

    List<PostDto> selectPostList(String interestsTag) throws Exception;

    List<PostDto> selectPostByTag(String searchTag) throws Exception;

    void insertPost(PostDto post) throws Exception;

    void insertPostFileList(List<PostFileDto> fileList) throws Exception;

    List<PostFileDto> selectPostFileList(int postIdx) throws Exception;

    void deletePost(int postIdx) throws Exception;


//    List<PostCommentDto> selectCommentList(int postIdx) throws Exception;
List<CmtDto> selectCmtList(int postIdx) throws Exception;

//    ------------------------------------------------------------------------

    List<AllDto> postout() throws Exception;

    void posting(PostDto postDto) throws Exception;

    void insertComment(CmtDto cmtDto);

    void deleteCmt(CmtDto cmtDto);
}

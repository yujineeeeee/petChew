package com.bitc.fs501.final4.service;

import com.bitc.fs501.final4.dto.*;
import com.bitc.fs501.final4.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
class PostServiceImpl implements PostService {

    private final PostMapper postMapper;

//    사용자 맞춤 게시물 리스트
    @Override
    public List<PostDto> selectPostList(String interestsTag) throws Exception {

        List<PostDto> selectPostList = postMapper.selectPostList(interestsTag);

        for(PostDto item : selectPostList){
            int postIdx = item.getPostIdx();

            List<PostFileDto> fileList = postMapper.selectPostFileList(postIdx);
            List<CmtDto> cmtList = postMapper.selectCmtList(postIdx);

            item.setCmtList(cmtList);
            item.setFileList(fileList);
        }

        return selectPostList;
    }

    public List<CmtDto> selectCmtList(int postIdx) throws Exception {
        return postMapper.selectCmtList(postIdx);
    }

//    검색한 태그를 가진 게시물 리스트
    @Override
    public List<PostDto> selectPostByTag(String searchTag) throws Exception{

        List<PostDto> selectPostList = postMapper.selectPostByTag(searchTag);

        for(PostDto item : selectPostList){
            int postIdx = item.getPostIdx();

            List<PostFileDto> fileList = postMapper.selectPostFileList(postIdx);
            List<CmtDto> cmtList = postMapper.selectCmtList(postIdx);

            item.setCmtList(cmtList);
            item.setFileList(fileList);
        }


        return selectPostList;
    }

//    게시물 등록
    @Override
    public void insertPost(PostDto postDto, List<String> insertImageUrl) throws Exception {
//        post 테이블에 값 넣어서 postIdx 값 postDto에 받아옴
        postMapper.insertPost(postDto);

        List<PostFileDto> fileList = new ArrayList<>();

//        업로드한 파일 갯수만큼 postFileDto 만들어서 List에 넣음
        for (String item : insertImageUrl) {
            PostFileDto postFile = new PostFileDto();

            postFile.setFilePostIdx(postDto.getPostIdx());
            postFile.setFilePostId(postDto.getPostId());
            postFile.setFileAddress(item);

            fileList.add(postFile);
        }

//        postFile 테이블에 insert
        postMapper.insertPostFileList(fileList);
    }


//    업로드한 파일 url 리스트
    @Override
    public List<PostFileDto> selectPostFileList(int postIdx) throws Exception {
        return postMapper.selectPostFileList(postIdx);
    }

//    게시물 삭제
    @Override
    public void deletePost(int postIdx) throws Exception {
        postMapper.deletePost(postIdx);

    }



//    -------------------------------------------------------------------------

    @Override
    public List<AllDto> postout() throws Exception {
        return postMapper.postout();
    }

    @Override
    public void posting(PostDto postDto) throws Exception {
        postMapper.posting(postDto);
    }

    @Override
    public void insertComment(CmtDto cmtDto) {
        postMapper.insertComment(cmtDto);
    }

    @Override
    public void deleteCmt(CmtDto cmtDto){
        postMapper.deleteCmt(cmtDto);
    }


}

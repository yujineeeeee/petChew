package com.bitc.fs501.final4.service;

import com.bitc.fs501.final4.dto.*;
import com.bitc.fs501.final4.mapper.PostMapper;
import com.bitc.fs501.final4.mapper.ProfileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProfileServiceImpl implements ProfileService {

    private final ProfileMapper profileMapper;

    private final PostMapper postMapper;



    @Override
    public UserDto selectUser(String userId) throws Exception {

        UserDto userInfo = profileMapper.selectUser(userId);

//        해당 유저의 동물정보 가져와서 넣기
        AnimalDto animal = profileMapper.selectUserAnimalList(userId);
        userInfo.setAnimalList(animal);

//        해당 유저 게시물 가져오기
        List<PostDto> userPost = profileMapper.selectUserPost(userId);

//        해당 게시물의 파일 가져오기
        for(PostDto item : userPost){
            int postIdx = item.getPostIdx();

            List<PostFileDto> fileList = postMapper.selectPostFileList(postIdx);

            item.setFileList(fileList);
        }

        userInfo.setPostList(userPost);



//        게시물의 댓글 가져오기


        return userInfo;
    }

    @Override
    public void updateUserInfo(UserDto userInfo) throws Exception {
//        user 테이블 업데이트
        profileMapper.updateUser(userInfo);

//        animal 테이블 업데이트
        AnimalDto animal = userInfo.getAnimalList();
        profileMapper.updateAnimal(animal);
    }

    @Override
    public PostDto selectProfilePost(int postIdx) throws Exception {
        PostDto postInfo = profileMapper.selectProfilePost(postIdx);

//        파일리스트
        List<PostFileDto> fileList = profileMapper.selectProfilePostFileList(postIdx);
        postInfo.setFileList(fileList);

//        댓글
        List<CmtDto> cmtList = profileMapper.selectProfilePostCmt(postIdx);
        postInfo.setCmtList(cmtList);

        return postInfo;
    }
}

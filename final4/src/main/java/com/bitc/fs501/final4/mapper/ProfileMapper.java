package com.bitc.fs501.final4.mapper;

import com.bitc.fs501.final4.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProfileMapper {

    UserDto selectUser(String userId) throws Exception;

   AnimalDto selectUserAnimalList(String userId) throws Exception;

    List<PostDto> selectUserPost(String userId) throws Exception;

    void updateUser(UserDto userInfo) throws Exception;

    void updateAnimal(AnimalDto animal) throws Exception;

    PostDto selectProfilePost(int postIdx) throws Exception;

    List<PostFileDto> selectProfilePostFileList(int postIdx) throws Exception;

    List<CmtDto> selectProfilePostCmt(int postIdx) throws Exception;
}

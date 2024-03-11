package com.bitc.fs501.final4.service;

import com.bitc.fs501.final4.dto.PostDto;
import com.bitc.fs501.final4.dto.UserDto;

public interface ProfileService {

    UserDto selectUser(String userId) throws Exception;

    void updateUserInfo(UserDto userInfo) throws Exception;

    PostDto selectProfilePost(int postIdx) throws Exception;
}

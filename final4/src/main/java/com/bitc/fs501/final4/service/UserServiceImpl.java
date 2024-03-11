package com.bitc.fs501.final4.service;

import com.bitc.fs501.final4.dto.AnimalDto;
import com.bitc.fs501.final4.dto.UserDto;
import com.bitc.fs501.final4.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public void registerUser(UserDto userDto) {
        userMapper.registerUser(userDto);
    }

    public boolean authenticateUser(UserDto userDto) {
        UserDto retrievedUser = userMapper.login(userDto);

        // 데이터베이스에서 검색된 사용자가 있는지 확인
        return retrievedUser != null;
    }

    public UserDto getUserById(String userId) {
        return userMapper.getUserById(userId);
    }

    public AnimalDto getAnimalByUserId(String userId) {
        return  userMapper.getAnimalByUserId(userId);
    }

    public void insertProfile(UserDto userDto) {
        userMapper.insertProfile(userDto);
    }

    public void insertAniprofile(AnimalDto animalDto) {
        userMapper.insertAniprofile(animalDto);
    }




}
package com.bitc.fs501.final4.service;

import com.bitc.fs501.final4.dto.AnimalDto;
import com.bitc.fs501.final4.dto.UserDto;

public interface UserService {
    void registerUser(UserDto userDto);

    boolean authenticateUser(UserDto userDto);

    UserDto getUserById(String userId);

    AnimalDto getAnimalByUserId(String userId);

    void insertProfile(UserDto userDto);

    void insertAniprofile(AnimalDto animalDto);
}

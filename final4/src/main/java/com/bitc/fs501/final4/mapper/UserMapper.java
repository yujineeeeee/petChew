package com.bitc.fs501.final4.mapper;
import com.bitc.fs501.final4.dto.AnimalDto;
import com.bitc.fs501.final4.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    void registerUser(UserDto userDto);

    UserDto login(UserDto userDto);

    UserDto getUserById(String userId);

    AnimalDto getAnimalByUserId(String userId);

    void insertProfile(UserDto userDto);

    void insertAniprofile(AnimalDto animalDto);
}

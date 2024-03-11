package com.bitc.fs501.final4.mapper;

import com.bitc.fs501.final4.dto.LogDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LogMapper {

    void insertLog(String searchTag) throws Exception;

    void deleteLog(String searchTag) throws Exception;

    List<LogDto> getLogList() throws Exception;

    void deleteCurrentLog(int logTagIdx) throws Exception;
}

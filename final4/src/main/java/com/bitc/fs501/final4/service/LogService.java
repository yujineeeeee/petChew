package com.bitc.fs501.final4.service;

import com.bitc.fs501.final4.dto.LogDto;

import java.util.List;

public interface LogService {


    void insertLog(String searchTag) throws Exception;

    void deleteLog(String searchTag) throws Exception;

    List<LogDto> getLogList() throws Exception;

    void deleteCurrentLog(int logTagIdx) throws Exception;
}

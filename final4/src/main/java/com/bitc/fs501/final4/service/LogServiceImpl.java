package com.bitc.fs501.final4.service;

import com.bitc.fs501.final4.dto.LogDto;
import com.bitc.fs501.final4.mapper.LogMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class LogServiceImpl implements LogService {

    private final LogMapper logMapper;

    @Override
    public void insertLog(String searchTag) throws Exception {
        logMapper.insertLog(searchTag);
    }

    @Override
    public void deleteLog(String searchTag) throws Exception {
        logMapper.deleteLog(searchTag);
    }

    @Override
    public List<LogDto> getLogList() throws Exception {
        return logMapper.getLogList();
    }

    @Override
    public void deleteCurrentLog(int logTagIdx) throws Exception {
        logMapper.deleteCurrentLog(logTagIdx);
    }
}

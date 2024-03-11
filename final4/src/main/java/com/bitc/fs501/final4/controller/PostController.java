package com.bitc.fs501.final4.controller;

import com.bitc.fs501.final4.dto.*;
import com.bitc.fs501.final4.service.LogService;
import com.bitc.fs501.final4.service.PostService;
import com.bitc.fs501.final4.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class PostController {

    private final PostService postService;

    private final S3Service s3Service;

    private final LogService logService;


    //    관심분야 관련 게시물 리스트 불러오기
    @GetMapping("/selectPostList")
    public Object selectPostList(@RequestParam("interestsTag") String interestsTag) throws Exception {
        Map<String, Object> result = new HashMap<>();

//        post 테이블 정보 가져오기
        List<PostDto> selectPostList = postService.selectPostList(interestsTag);

        result.put("result", "success");
        result.put("data", selectPostList);

        return result;
    }

    //    태그 검색해서 게시물 리스트 불러오기
    @GetMapping("/selectPostByTag")
    public Object selectPostByTag(@RequestParam("searchTag") String searchTag) throws Exception {
        Map<String, Object> result = new HashMap<>();

//        입력한 데이터가 log 테이블에 존재하면 삭제
        logService.deleteLog(searchTag);

//        검색한 태그 log 테이블에 넣기
        logService.insertLog(searchTag);

//        검색한 결과
        List<PostDto> selectPostList = postService.selectPostByTag(searchTag);

        result.put("result", "success");
        result.put("data", selectPostList);

        return result;
    }


    //    게시물 작성하기
    @PostMapping("/insertPost")
    public Object insertPost(@RequestPart List<MultipartFile> multipartFile, @RequestPart PostDto postDto) throws Exception {
        Map<String, Object> result = new HashMap<>();

//        등록한 파일들 url을 list로 받아옴
        List<String> insertImageUrl = s3Service.uploadImage(multipartFile);

        postService.insertPost(postDto, insertImageUrl);

        result.put("result", "success");

        return result;
    }

    //    게시물 삭제
    @GetMapping("/deletePost")
    public Object deletePost(@RequestParam("postIdx") int postIdx) throws Exception {
        Map<String, Object> result = new HashMap<>();

//        삭제할 게시물에 첨부된 파일 list 가져오기
        List<PostFileDto> fileUrlList = postService.selectPostFileList(postIdx);

//        해당 파일 s3에서 삭제
        s3Service.deleteImageList(fileUrlList);

//        게시물 삭제 (post 지우면 post_file도 같이 지워짐)
        postService.deletePost(postIdx);

        result.put("result", "success");

        return result;
    }

    //    로그 리스트 가져오기
    @GetMapping("/getLogList")
    public Object getLogList() throws Exception {
        Map<String, Object> result = new HashMap<>();

        List<LogDto> logList = logService.getLogList();

        result.put("result", "success");
        result.put("data", logList);

        return result;
    }

    @GetMapping("/deleteCurrentLog")
    public Object deleteCurrentLog(@RequestParam int logTagIdx) throws Exception {
        Map<String, Object> result = new HashMap<>();

        logService.deleteCurrentLog(logTagIdx);

        result.put("result", "success");

        return result;
    }

    //    ------------------------------------------------------------------------------
    @GetMapping("/postout")
    public ResponseEntity<List<AllDto>> postout() throws Exception {
        List<AllDto> postData = postService.postout();
        return new ResponseEntity<>(postData, HttpStatus.OK);
    }


    @PostMapping("/insertComment")
    public ResponseEntity<String> insertComment(CmtDto cmtDto) {
        try {
            postService.insertComment(cmtDto);
            return ResponseEntity.ok("통신성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("통신에러");
        }
    }

    @PostMapping("/deleteCmt")
    public ResponseEntity<String> deleteCmt(CmtDto cmtDto) {
        try {
            postService.deleteCmt(cmtDto);
            return ResponseEntity.ok("통신성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("통신에러");
        }
    }
}


package com.bitc.fs501.final4.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.bitc.fs501.final4.dto.PostFileDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Service {

   @Value("${cloud.aws.s3.bucket}")
    private String bucket;

   private final AmazonS3 amazonS3;

    public List<String> uploadImage(List<MultipartFile> multipartFile) throws Exception{
        List<String> fileList = new ArrayList<>();

//        이미지 파일만 올리기 위한 Exception 생성
//        for(MultipartFile mf : multipartFile){
//            String contentType = mf.getContentType();
//
//            if(ObjectUtils.isEmpty(contentType)){
//                throw new Exception("확장자명이 존재하지 않습니다.");
//            }
//            else if(!contentType.equals(ContentType.IMAGE_JPEG.toString()) || !contentType.equals(ContentType.IMAGE_PNG.toString())){
//                throw new Exception("이미지(.jpg, .png) 확장자가 아닙니다.");
//            }
//        }

        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmssSSS");
        String formatedNow = now.format(formatter);

//       forEach 구문을 통해 multipartFile로 넘어온 파일들 하나씩 fileNameList에 추가
        multipartFile.forEach(file -> {

            String fileName = formatedNow + "-" + file.getOriginalFilename();
//        ObjectMetadata : 업로드 할 파일 사이즈를 ContentLength로 S3에게 알려주기 위함
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());

            Map<String, String> fileInfo = new HashMap<>();

            try(InputStream inputStream = file.getInputStream()) {
    //        putObject(bucket, s3FileName, inputStream, objMeta) : 파일 Stream 열어서 S3에 파일 업로드
                amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));

    //        getUrl() : S3에 업로드 된 사진 URL 가져오기
                String fileUrl = amazonS3.getUrl(bucket, fileName).toString();

//                fileInfo.put("fileName", fileName);
//                fileInfo.put("fileUrl", fileUrl);
                fileList.add(fileUrl);

            } catch(IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
            }


//            fileList.add(fileInfo);
        });

        return fileList;

    }

//    단일 이미지 삭제
    public void deleteImage(String fileUrl) throws Exception{
        String splitStr = ".com/";
        String fileName = fileUrl.substring(fileUrl.lastIndexOf(splitStr) + splitStr.length());

        amazonS3.deleteObject(bucket, fileName);
    }

//    여러 이미지 삭제
    public void deleteImageList(List<PostFileDto> fileUrlList) {

        for(PostFileDto file : fileUrlList){
            String splitStr = ".com/";
            String item = file.getFileAddress();
            String fileName = item.substring(item.lastIndexOf(splitStr) + splitStr.length());

            amazonS3.deleteObject(bucket, fileName);
        }
    }
}

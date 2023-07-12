package com.exempleapp.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.exempleapp.service.S3Service;
import com.amazonaws.services.s3.AmazonS3;

@RestController
public class S3Controller {

    @GetMapping("/s3ListObjects")
    public String s3(@RequestParam(value = "bucketName", defaultValue = "undairstand") String[] bucketName) {
        new S3Service();
        System.out.println("bucket name : " + bucketName[0]);
        try {
            AmazonS3 s3Service = S3Service.main(bucketName);
            System.out.println(s3Service.listObjects(bucketName[0]).getObjectSummaries().get(0).getKey());
            return s3Service.listObjects(bucketName[0]).getObjectSummaries().get(0).getKey();
        } catch (Exception e) {
            String error = "error : " + e.getMessage();
            System.out.println(error);
            return "Request made on " + bucketName[0] + "\r\n error : " + e.getMessage();
        }
    }
}

package com.exempleapp.service;

import java.util.List;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.S3ObjectSummary;

public class S3Service {
    public static AmazonS3 main(String[] args) {
        final String USAGE = "\n" +
                "To run this example, supply the name of a bucket to list!\n" +
                "\n" +
                "Ex: ListObjects <bucket-name>\n";

        if (args.length < 1) {
            System.out.println(USAGE);
            System.exit(1);
        }

        String bucket_name = args[0];

        System.out.format("Objects in S3 bucket %s:\n", bucket_name);
        final AmazonS3 s3 = AmazonS3ClientBuilder.standard().withRegion(Regions.EU_WEST_3).build();
        ListObjectsV2Result result = s3.listObjectsV2(bucket_name);
        List<S3ObjectSummary> objects = result.getObjectSummaries();
        for (S3ObjectSummary os : objects) {
            System.out.println("* " + os.getKey());
        }
        GetResultsFormatedString(result);
        return s3;
    }

    public static String GetResultsFormatedString(ListObjectsV2Result result) {
        List<S3ObjectSummary> objects = result.getObjectSummaries();
        String resultFormated = "";
        for (S3ObjectSummary os : objects) {
            System.out.println("* " + os.getKey());
            resultFormated = String.join(os.getKey(), "\n");
        }
        return resultFormated;
    }
}

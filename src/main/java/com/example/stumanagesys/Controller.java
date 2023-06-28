package com.example.stumanagesys;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONArray;

import java.io.*;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;

public class Controller {
    static void saveStuData(java.util.List source) throws IOException {
        String jsonText = JSONArray.toJSONString(source);

        File jsonFile = new File("src\\main\\resources\\com\\example\\stumanagesys\\students.json");
        FileOutputStream output = new FileOutputStream(jsonFile);
        OutputStreamWriter writer=new OutputStreamWriter(output, StandardCharsets.UTF_8);
        writer.write(jsonText);
        writer.close();
    }

    static void saveStuDataFromJsonText(String jsonText) throws IOException {
        File jsonFile = new File("src\\main\\resources\\com\\example\\stumanagesys\\students.json");
        FileOutputStream output = new FileOutputStream(jsonFile);
        OutputStreamWriter writer=new OutputStreamWriter(output, StandardCharsets.UTF_8);
        writer.write(jsonText);
        writer.close();
    }

    static void saveAdministratorData(java.util.List source) throws IOException {
        String jsonText = JSONArray.toJSONString(source);

        File jsonFile = new File("src\\main\\resources\\com\\example\\stumanagesys\\administrators.json");
        FileOutputStream output = new FileOutputStream(jsonFile);
        OutputStreamWriter writer=new OutputStreamWriter(output, StandardCharsets.UTF_8);
        writer.write(jsonText);
        writer.close();
    }

    static java.util.List readStuData() throws IOException {
        InputStream input = new FileInputStream("src\\main\\resources\\com\\example\\stumanagesys\\students.json");

        InputStreamReader reader = new InputStreamReader(input, StandardCharsets.UTF_8);

        StringBuilder cache = new StringBuilder();
        while (reader.ready()) {
            cache.append((char) reader.read());
        }
        reader.close();

        String jsonText = cache.toString();

        return JSON.parseArray(jsonText, Student.class);
    }

    static java.util.List readAdministratorData() throws IOException {
        InputStream input = new FileInputStream("src\\main\\resources\\com\\example\\stumanagesys\\administrators.json");

        InputStreamReader reader = new InputStreamReader(input, StandardCharsets.UTF_8);

        StringBuilder cache = new StringBuilder();
        while (reader.ready()) {
            cache.append((char) reader.read());
        }
        reader.close();

        String jsonText = cache.toString();

        return JSON.parseArray(jsonText, Administrator.class);
    }

    static String getStuFileString() throws IOException {
        InputStream input = new FileInputStream("src\\main\\resources\\com\\example\\stumanagesys\\students.json");

        InputStreamReader reader = new InputStreamReader(input, StandardCharsets.UTF_8);

        StringBuilder cache = new StringBuilder();
        while (reader.ready()) {
            cache.append((char) reader.read());
        }
        reader.close();

        return cache.toString();
    }
}

package com.example.stumanagesys;

import com.alibaba.fastjson2.JSONObject;

import java.io.IOException;
import java.net.URISyntaxException;

/**JS to Java*/
public class JavaConnector {
    public boolean isAdmin(String source) throws IOException {
        JSONObject sourceMap=JSONObject.parse(source);
        java.util.List<Administrator> adminData=Controller.readAdministratorData();
        boolean check=false;
        for (Administrator adminDatum : adminData) {
            if (sourceMap.get("id").equals(Integer.toString(adminDatum.id)) && sourceMap.get("password").equals(adminDatum.password)) {
                check = true;
            }
        }
        return check;
    }

    public String getStuData() throws IOException {
        return Controller.getStuFileString();
    }

    public int isStudent(String source) throws IOException {
        JSONObject sourceMap=JSONObject.parse(source);
        java.util.List<Student> studentData=Controller.readStuData();
        int index=-1;
        for (int i = 0; i < studentData.size(); i++) {
            if(sourceMap.get("id").equals(Integer.toString(studentData.get(i).id))&&sourceMap.get("password").equals(studentData.get(i).password)){
                index=i;
            }
        }
        return index;
    }

    public String getStuSelf(int index) throws IOException {
        java.util.List<Student> studentData=Controller.readStuData();
        return JSONObject.toJSONString(studentData.get(index));
    }

    public void saveAllChanges(String source) throws IOException {
        Controller.saveStuDataFromJsonText(source);
    }
}

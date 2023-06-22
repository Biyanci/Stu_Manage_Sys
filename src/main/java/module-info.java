module com.example.stumanagesys {
    requires javafx.controls;
    requires javafx.fxml;

    requires com.dlsc.formsfx;
    requires jdk.jsobject;
    requires javafx.web;
    requires com.alibaba.fastjson2;

    opens com.example.stumanagesys to javafx.fxml;
    exports com.example.stumanagesys;
}
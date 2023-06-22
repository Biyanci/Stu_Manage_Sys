package com.example.stumanagesys;

import javafx.application.Application;
import javafx.concurrent.Worker;
import javafx.scene.Scene;
import javafx.scene.layout.StackPane;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Stage;
import netscape.javascript.JSObject;

import java.util.Objects;

public class HelloApplication extends Application {

    @Override
    public void start(Stage stage) {
        StackPane root = new StackPane();
        WebView view = new WebView();
        WebEngine engine = view.getEngine();

        JavaConnector javaConnector = new JavaConnector();
        engine.getLoadWorker().stateProperty().addListener((observable, oldValue, newValue) -> {
            if (Worker.State.SUCCEEDED == newValue) {
                JSObject window = (JSObject) engine.executeScript("window");
                window.setMember("javaConnector", javaConnector);
            }
        });

        String url = Objects.requireNonNull(getClass().getResource("index.html")).toExternalForm();
        engine.load(url);
        root.getChildren().add(view);

        Scene scene = new Scene(root, 738, 600);
        stage.setScene(scene);
        stage.setTitle("Test");
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }
}
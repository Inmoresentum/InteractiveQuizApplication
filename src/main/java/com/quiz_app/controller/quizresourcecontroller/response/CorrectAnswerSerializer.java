package com.quiz_app.controller.quizresourcecontroller.response;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.util.List;

public class CorrectAnswerSerializer
        extends JsonSerializer<List<Integer>> {
    @Override
    public void serialize(List<Integer> value,
                          JsonGenerator gen,
                          SerializerProvider serializers)
            throws IOException {
        if (value.size() == 1) {
            gen.writeObject(value.get(0).toString());
        } else {
            gen.writeObject(value);
        }
    }
}

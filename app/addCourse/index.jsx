import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import React from "react";
import Colors from "../../constant/Colors";
import Button from "../../components/Home/shared/Button";
import { useState } from "react";
import { GenerateTopicsAIModel } from "../../config/AiModel";
import Prompt from "../../constant/Prompt";

export default function AddCourse() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState();
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopics] = useState([]);
  const onGenerateTopic = async () => {
    //get topic fromm ai
    setLoading(true);
    const PROMPT = userInput + Prompt.IDEA;
    const aiResp = await GenerateTopicsAIModel.sendMessage(PROMPT);
    const topicIdea = JSON.parse(aiResp.response.text());
    console.log(topicIdea);
    setTopics(topicIdea?.courseTitles);
    setLoading(false);
  };
  const onTopicSelect = (topic) => {
    const isAlreadyExist = selectedTopic.find((item) => item == topic);
    if (!isAlreadyExist) {
      setSelectedTopics((prev) => [...prev, topic]);
    } else {
      const topics = selectedTopic.filter((item) => item != topic);
      setSelectedTopics(topics);
    }
  };
  const isTopicSelected = (topic) => {
    const selection = selectedTopic.find((item) => item == topic);
    return selection ? true : false;
  };
  const onGenerateCourse=()=>{
    const PROMPT = selectedTopic+ Prompt.COURSE;
  }
  return (
    <View
      style={{
        padding: 25,
        backgroundColor: Colors.WHITE,
        flex: 1,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
        }}
      >
        Create New Course
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 25,
        }}
      >
        What you want to learn today?
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 20,
          marginTop: 8,
          color: Colors.GRAY,
        }}
      >
        What course you want to create(ex. Learn Python, Digital Marketing, 10th
        Science Chapters, etc...)
      </Text>

      <TextInput
        placeholder="(Ex. Learn Python, Learn 12th Chemistry)"
        style={styles.TextInput}
        numberOfLines={3}
        multiline={true}
        onChangeText={(value) => setUserInput(value)}
      />
      <Button
        text={"Generate Topic"}
        type="outline"
        onPress={() => onGenerateTopic()}
        loading={loading}
      />

      <View
        style={{
          marginTop: 15,
          marginBottom: 10
        }}
      >
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 20,
          }}
        >
          Select all topics which you want to add in course.
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 6,
          }}
        >
          {topics.map((item, index) => (
            <Pressable key={index} onPress={() => onTopicSelect(item)}>
              <Text
                style={{
                  padding: 7,
                  borderWidth: 0.4,
                  borderRadius: 99,
                  paddingHorizontal: 15,
                  backgroundColor: isTopicSelected(item)
                    ? Colors.PRIMARY
                    : null,
                  color: isTopicSelected(item) ? Colors.WHITE : Colors.PRIMARY,
                }}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      {selectedTopic?.length > 0 && (
        <Button
          text="Generate Course"
          onPress={() => onGenerateCourse()}
          loading={loading}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    height: 100,
    marginTop: 10,
    fontSize: 18,
    alignItems: "flex-start",
  },
});

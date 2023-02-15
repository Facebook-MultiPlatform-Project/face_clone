import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { navigation } from "../rootNavigation";
import { SearchApi } from "../apis/Search/SearchApi";
import Post from "../Components/Post";
import { Avatar } from "react-native-paper";

const buttonList = [
  // { name: "Tất cả", value: 0 },
  { name: "Bài đăng", value: 1 },
  { name: "Người dùng", value: 2 },
];

const UserItem = ({ id, avatar, name }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        maxWidth: "100%",
      }}
      onPress={() => {
        navigation.navigate("profile", {
          userId: id,
        });
      }}
    >
      <Avatar.Image
        size={75}
        source={{
          uri: avatar,
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <Text
          style={{
            flex: 1,
            flexWrap: "wrap",
            maxWidth: "100%",
            fontSize: 20,
            fontWeight: "700",
          }}
          numberOfLines={3}
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Search = () => {
  const [searchInput, setSearchInput] = React.useState("");
  const [searchType, setSearchType] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [res, setRes] = React.useState([]);
  const handleChange = (input) => {
    try {
      setSearchInput(input);
    } catch (err) {
      console.log("change text err", err);
    }
  };
  const handleChangeType = async (type) => {
    try {
      setSearchType(type);
      await handleSubmit(searchInput, type);
    } catch (err) {
      console.log("change type err", err);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleSubmit(searchInput, searchType);
    setRefreshing(false);
  });
  const handleSubmit = async (input, type) => {
    setIsLoading(true);
    try {
      const res = await SearchApi.search({
        keyword: input,
        searchType: type,
        take: 10,
        skip: 0,
      });
      console.log("data", res.data.data);
      setRes(res.data.data);
    } catch (err) {
      console.log("search err", err);
    }
    setIsLoading(false);
  };
  return (
    <View style={{ paddingTop: StatusBar.currentHeight }}>
      <View
        style={{
          paddingBottom: 15,
          borderBottomColor: "#bababa",
          borderBottomWidth: 1,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            paddingTop: 30,
            height: 90,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ marginRight: 10 }}
          >
            <Icon type="material" name="arrow-back"></Icon>
          </TouchableOpacity>
          <TextInput
            placeholder="Tìm kiếm"
            style={{
              borderRadius: 100,
              flex: 1,
              borderWidth: 1,
              borderColor: "#CFCFD5",
              paddingHorizontal: 20,
              paddingVertical: 5,
              marginRight: 15,
            }}
            onChangeText={(text) => handleChange(text)}
            onSubmitEditing={async () => {
              await handleSubmit(searchInput, searchType);
            }}
            value={searchInput}
          ></TextInput>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {buttonList.map((button) => (
            <TouchableOpacity
              key={button.value}
              style={{
                backgroundColor: searchType === button.value ? "#ccc" : "#fff",
                borderWidth: 1,
                borderRadius: 20,
                borderColor: "#AAA",
                padding: 10,
                marginRight: 6,
              }}
              onPress={() => handleChangeType(button.value)}
            >
              <Text
                style={{
                  color: "#333",
                  fontWeight: "600",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                {button.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View
        style={{
          paddingBottom: 15,
        }}
      >
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading && (
            <ActivityIndicator color={"000"} style={{ marginTop: 10 }} />
          )}
          {!isLoading && res.length === 0 && (
            <Text style={{ fontSize: 20, fontWeight: "600", padding: 10 }}>
              0 kết quả
            </Text>
          )}
          {!isLoading &&
            searchType === 1 &&
            res.map((item, index) => <Post key={index} {...item} />)}
          {!isLoading &&
            searchType === 2 &&
            res.map((item, index) => {
              console.log("item", item);
              return <UserItem key={index} {...item} />;
            })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Search;

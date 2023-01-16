import { View, Text, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import { navigation } from "../rootNavigation";

const Toolbar = (props) => {
  const { title } = props;

  return (
    <View>
      <View
        style={{
          height: 60,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/imgs/left-arrow.png")}
            style={{ marginLeft: 10, marginRight: 10, width: 16, height: 16 }}
          ></Image>
        </TouchableOpacity>
        <Text
          style={{
            color: "#000",
            fontWeight: "600",
            fontSize: 18,
          }}
        >
          {title}
        </Text>
        <View
          style={{ width: 16, height: 16, marginLeft: 10, marginRight: 10 }}
        ></View>
      </View>
      <View
        style={{
          borderBottomColor: "#EEE",
          borderBottomWidth: 1,
        }}
      />
    </View>
  );
};

export default Toolbar;

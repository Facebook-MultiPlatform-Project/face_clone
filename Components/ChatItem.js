import { Image } from "react-native";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

const ChatItem = ({ itemPrev, item, itemNext, otherUri }) => {
  const user = useSelector((state) => state.user.user);
  const userID = user.id || "ceb34d32-6634-4f3c-bb40-dd44825a8f26";

  const marginBot = () => {
    if (itemNext && item.user.id === itemNext.user.id) return 2;
    return 12;
  };
  return item.user.id === userID ? (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: marginBot(),
      }}
    >
      <View
        style={{
          maxWidth: "60%",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Text
          style={{
            marginRight: 20,
            backgroundColor: "#3d85c6",
            padding: 8,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopRightRadius:
              itemPrev && itemPrev.user.id === item.user.id ? 0 : 10,
            borderBottomRightRadius:
              itemNext && itemNext.user.id === item.user.id ? 0 : 10,
            fontSize: 15,
            color: "white",
          }}
        >
          {item && item.content}
        </Text>
      </View>
    </View>
  ) : (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: marginBot(),
      }}
    >
      <View
        style={{
          maxWidth: "60%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingLeft: 5,
          }}
        >
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 100,
            }}
            source={{
              uri:
                itemNext && itemNext.user.id === item.user.id ? null : otherUri,
            }}
          ></Image>
        </View>

        <Text
          style={{
            marginLeft: 6,
            backgroundColor: "#dadada",
            padding: 8,
            borderTopLeftRadius:
              itemPrev && itemPrev.user.id === item.user.id ? 0 : 10,
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius:
              itemNext && itemNext.user.id === item.user.id ? 0 : 10,
            fontSize: 15,
          }}
        >
          {item && item.content}
        </Text>
      </View>
    </View>
  );
};
export default ChatItem;

import { Image } from "react-native";
import { Text, View } from "react-native";

const ChatItem = ({ itemPrev, item, itemNext }) => {
  const userid = 1;
  const marginBot = () => {
    if (itemNext && item.idsend === itemNext.idsend) return 2;
    return 12;
  };
  return item.idsend === userid ? (
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
              itemPrev && itemPrev.idsend === item.idsend ? 0 : 10,
            borderBottomRightRadius:
              itemNext && itemNext.idsend === item.idsend ? 0 : 10,
            fontSize: 15,
            color: "white",
          }}
        >
          {item.mess}
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
                itemNext && itemNext.idsend === item.idsend ? null : item.uri,
            }}
          ></Image>
        </View>

        <Text
          style={{
            marginLeft: 6,
            backgroundColor: "#dadada",
            padding: 8,
            borderTopLeftRadius:
              itemPrev && itemPrev.idsend === item.idsend ? 0 : 10,
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius:
              itemNext && itemNext.idsend === item.idsend ? 0 : 10,
            fontSize: 15,
          }}
        >
          {item.mess}
        </Text>
      </View>
    </View>
  );
};
export default ChatItem;

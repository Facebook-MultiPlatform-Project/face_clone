import { StyleSheet, View } from "react-native";
import LoginPage from "./Screens/LoginPage.js";

export default function App() {
  return (
    <View style={styles.container}>
      <LoginPage></LoginPage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

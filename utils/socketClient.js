import io from "socket.io-client";
import * as SecureStore from "expo-secure-store";

const SOCKET_URL = "https://facebook-api-production.up.railway.app";

class WSService {
  initializeSocket = async () => {
    try {
      const access_token = await SecureStore.getItemAsync("access_token");
      this.socket = io(SOCKET_URL, {
        extraHeaders: {
          Authorization: access_token,
        },
      });

      console.log("initializing socket");

      this.socket.on("connect", (data) => {
        console.log("=== socket connected ====");
      });

      this.socket.on("disconnect", (data) => {
        console.log("=== socket disconnected ====");
      });

      this.socket.on("error", (data) => {
        console.log("socekt error", data);
      });
    } catch (error) {
      console.log("scoket is not inialized", error);
    }
  };

  emit(event, data = {}) {
    this.socket.emit(event, data);
  }

  on(event, cb) {
    this.socket.on(event, cb);
  }

  removeListener(listenerName) {
    this.socket.removeListener(listenerName);
  }

  off(event) {
    this.socket.off(event);
  }
}

const socketClient = new WSService();

export default socketClient;

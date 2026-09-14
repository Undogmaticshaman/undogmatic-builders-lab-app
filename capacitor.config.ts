import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.undogmatic.builderslab",
  appName: "Undogmatic Builders Lab",
  webDir: "dist",
  backgroundColor: "#0b0d0c",
  loggingBehavior: "debug",
  zoomEnabled: false,
  android: {
    allowMixedContent: false,
  },
  server: {
    androidScheme: "https",
    iosScheme: "capacitor",
  },
};

export default config;

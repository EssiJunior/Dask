import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import Typography from "../components/text/Typography";
import Button from "../components/buttons/Button";
import { Dimensions, View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import HeaderText from "../components/layouts/headers/HeaderText";

export default function TermsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <HeaderText title="Terms and Conditions" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: "center", paddingTop: 20 }}
      >
        <View style={styles.termsItem}>
          <Typography text="Introduction:" style={styles.title} />

          <View style={styles.content}>
            <Typography
              text="Welcome to the Dask Task Manager App. By using this App, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using the App."
              style={styles.paragraph}
            />
          </View>
        </View>

        <View style={styles.termsItem}>
          <Typography text="User Data and Privacy:" style={styles.title} />

          <View style={styles.content}>
            <Typography
              text="1. Dask - Collaborative Task Manager App may require access to your device's storage and files to store and manage your tasks effectively."
              style={styles.paragraph}
            />
            <Typography
              text="2. Your privacy is crucial to us. We will only access and use the necessary data to provide you with the task management services."
              style={styles.paragraph}
            />
          </View>
        </View>

        <View style={styles.termsItem}>
          <Typography text="Use of Storage and Files:" style={styles.title} />

          <View style={styles.content}>
            <Typography
              text="1. By granting access to your device's storage and files, you allow the Dask Task Manager App to create, modify, and delete files associated with tasks and task-related data."
              style={styles.paragraph}
            />
            <Typography
              text="2. The App will not access any personal files or data outside of its designated storage area for task management purposes."
              style={styles.paragraph}
            />
            <Typography
              text="3. The App will not share or upload your files to any external server or third-party without your explicit consent.."
              style={styles.paragraph}
            />
          </View>
        </View>

        <View style={styles.termsItem}>
          <Typography text="Backup and Data Loss:" style={styles.title} />

          <View style={styles.content}>
            <Typography
              text="1. While the Dask Task Manager App takes reasonable measures to protect your data, we are not responsible for any data loss or corruption that may occur due to device malfunctions, software updates, or other unforeseen circumstances."
              style={styles.paragraph}
            />
            <Typography
              text="2. It is your responsibility to regularly back up your task data if you wish to safeguard against potential data loss."
              style={styles.paragraph}
            />
            <Typography
              text="3. All yours shared projects will be store on the secured cloud, so that you could always have access to them. But for the personal tasks, you have to keep them safe by yourself."
              style={styles.paragraph}
            />
          </View>
        </View>

        <View style={styles.termsItem}>
          <Typography text="Intellectual Property:" style={styles.title} />

          <View style={styles.content}>
            <Typography
              text="1. All intellectual property rights related to the Dask - Collaborative Task Manager App and its content, including but not limited to logos, designs, and software, are owned by Dilane3 or its licensors."
              style={styles.paragraph}
            />
            <Typography
              text="2. You may not use, reproduce, or distribute any part of the App's intellectual property without prior written permission from Dilane3."
              style={styles.paragraph}
            />
          </View>
        </View>

        <View style={styles.termsItem}>
          <Typography text="User Conduct:" style={styles.title} />

          <View style={styles.content}>
            <Typography
              text="1. You agree to use the Dask - Collaborative Task Manager App responsibly and not engage in any activities that may harm the App, its users, or its functionality."
              style={styles.paragraph}
            />
            <Typography
              text="2. You shall not use the App to store or distribute any unlawful, offensive, or harmful content."
              style={styles.paragraph}
            />
          </View>
        </View>

        <View style={styles.termsItem}>
          <Typography text="Termination:" style={styles.title} />

          <View style={styles.content}>
            <Typography
              text="1. The Dask - Collaborative Task Manager App reserves the right to suspend or terminate your access to the App, at its discretion, if you violate these Terms and Conditions or engage in any activity that compromises the security or integrity of the App."
              style={styles.paragraph}
            />
            <Typography
              text="2. In case of termination, your task data may be deleted permanently from the App's servers. It is recommended to back up your data regularly."
              style={styles.paragraph}
            />
          </View>
        </View>

        <View style={styles.termsItem}>
          <Typography
            text="Changes to Terms and Conditions:"
            style={styles.title}
          />

          <View style={styles.content}>
            <Typography
              text="1. The Dask - Collaborative Task Manager App reserves the right to update or modify these Terms and Conditions at any time."
              style={styles.paragraph}
            />
            <Typography
              text="2. Users will be notified of any changes to the Terms and Conditions within the App. Continued use of the App after such modifications constitutes your acceptance of the updated terms."
              style={styles.paragraph}
            />
          </View>
        </View>

        <View style={styles.termsItem}>
          <Button onPress={() => router.back()} style={{ width: "100%" }}>
            <Typography text="I Agree" style={styles.btnText} />
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    width: Dimensions.get("window").width,
    backgroundColor: Colors.light.background,
  },

  termsItem: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontFamily: "TitilliumBold",
  },

  content: {
    marginTop: 20,
    width: "100%",
  },

  paragraph: {
    fontSize: 16,
    fontFamily: "TitilliumRegular",
    color: Colors.light.text,
    marginBottom: 15,
  },

  btnText: {
    fontSize: 18,
    fontFamily: "TitilliumBold",
    color: Colors.dark.text,
  },
});

import AuthHeader from "@/components/auth";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

type FieldType = {
  key: string;
  label: string;
  placeholder: string;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  secureTextEntry?: boolean;
};

export default function SignUpScreen() {
  const fields: FieldType[] = [
    {
      key: "name",
      label: "Full Name",
      placeholder: "John Doe",
      keyboardType: "default",
      autoCapitalize: "words",
    },
    {
      key: "phone",
      label: "Phone Number",
      placeholder: "+880 1XXXXXXXXX",
      keyboardType: "phone-pad",
      autoCapitalize: "none",
    },
    {
      key: "email",
      label: "Email Address",
      placeholder: "john@example.com",
      keyboardType: "email-address",
      autoCapitalize: "none",
    },
    {
      key: "password",
      label: "Password",
      placeholder: "Min. 8 characters",
      secureTextEntry: true,
      autoCapitalize: "none",
    },
    {
      key: "address",
      label: "Address",
      placeholder: "Your full address",
      keyboardType: "default",
      autoCapitalize: "sentences",
    },
  ];

  const renderField = (field: FieldType) => {
    return (
      <View key={field.key} style={[styles.fieldWrapper]}>
        <Text style={[styles.label]}>{field.label}</Text>
        <View
          style={[
            styles.inputContainer,
            //  styles.inputContainerFocused,
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder={field.placeholder}
            placeholderTextColor={"#9CA3AF"}
            keyboardType={field.keyboardType || "default"}
            autoCapitalize={field.autoCapitalize || "none"}
            secureTextEntry={field.secureTextEntry}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <AuthHeader title="Create Account" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/*render fields */}
          {fields?.map(renderField)}

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.88}>
            <Text style={styles.submitButtonText}>Create Account</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Login */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/profile/auth")}
            >
              <Text style={styles.loginLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#FDF2F7",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 22,
    shadowColor: "#E2136E",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },

  fieldWrapper: {
    marginBottom: 16,
    flex: 1,
  },

  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9CA3AF",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  labelFocused: {
    color: "#E2136E",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#EDEDED",
    paddingHorizontal: 12,
    height: 50,
  },

  inputContainerFocused: {
    borderColor: "#E2136E",
    backgroundColor: "#FCE4F0",
    shadowColor: "#E2136E",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#1F1F1F",
    fontWeight: "400",
    paddingVertical: 0,
  },

  submitButton: {
    backgroundColor: "#E2136E",
    borderRadius: 16,
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    shadowColor: "#E2136E",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
    gap: 8,
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
    gap: 10,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#EDEDED",
  },

  dividerText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "600",
  },

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  loginText: {
    fontSize: 14,
    color: "#6B7280",
  },

  loginLink: {
    fontSize: 14,
    color: "#E2136E",
    fontWeight: "700",
  },
});
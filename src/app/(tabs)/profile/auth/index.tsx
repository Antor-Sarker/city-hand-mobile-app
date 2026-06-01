import AuthHeader from "@/components/auth";
import { BASE_URL } from "@/config/api";
import { useAuth } from "@/context/authContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    userID: string;
    name: string;
    email: string;
    role: string;
  }

  async function handelLogin() {
    try {
      setIsLoading(true);
      setIsError(false);

      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Client-Type": "mobileApp",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed!");
      }

      const data: LoginResponse = await response.json();
      login(data?.accessToken, data?.refreshToken);
    } catch (error) {
      setIsError(true);
      console.log("Login API Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <AuthHeader title="Log In" />

      <View style={styles.container}>
        {/* ── Form Card ── */}
        {isError && <Text style={styles.error}>Please Try Again!</Text>}
        <View style={styles.card}>
          {/* Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={[styles.inputWrapper]}>
              <TextInput
                style={styles.input}
                placeholder="john@example.com"
                placeholderTextColor={"#B0B5CC"}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={[styles.inputWrapper]}>
              <TextInput
                style={[styles.input, { paddingRight: 60 }]}
                placeholder="password"
                placeholderTextColor={"#B0B5CC"}
                secureTextEntry={hidePassword}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.showBtn}
                activeOpacity={0.7}
                onPress={() => setHidePassword((prev) => !prev)}
              >
                <Text style={styles.showBtnText}>
                  {hidePassword ? (
                    <Ionicons name="eye-outline" size={20} color="black" />
                  ) : (
                    <Ionicons name="eye-off-outline" size={20} color="black" />
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotWrap} activeOpacity={0.7}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Pressable
            style={({ pressed }) => [
              styles.loginBtn,
              { flexDirection: "row" },
              pressed && styles.loginBtnPressed,
            ]}
            onPress={handelLogin}
          >
            <Text style={styles.loginBtnText}>Log In</Text>
            {isLoading && <ActivityIndicator size="small" color={"white"} />}
          </Pressable>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
              <Text style={styles.socialIcon}>G</Text>
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
              <Text style={styles.socialIcon}>f</Text>
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Sign Up Link ── */}
        <View style={styles.signupRow}>
          <Text style={styles.signupPrompt}>Don't have an account? </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/(tabs)/profile/auth/signup")}
          >
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  // ── Card ──
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 28,
    shadowColor: "#E2136E",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
  },

  error: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10,
    color: "#E2136E",
  },

  // ── Form fields ──
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#5C6080",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F4FB",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E2E5F5",
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 14,
    paddingHorizontal: 10,
    color: "#1A1D2E",
    fontWeight: "400",
  },
  showBtn: {
    paddingHorizontal: 14,
    height: 50,
    justifyContent: "center",
  },
  showBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#E2136E",
    letterSpacing: 0.3,
  },

  // ── Forgot ──
  forgotWrap: {
    alignSelf: "flex-end",
    marginBottom: 22,
    marginTop: 4,
  },
  forgotText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#E2136E",
  },

  // ── Login button ──
  loginBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#E2136E",
    borderRadius: 14,
    paddingVertical: 15,
    shadowColor: "#E2136E",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  loginBtnPressed: {
    backgroundColor: "#C40D5A",
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.2,
  },
  loginBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },

  // ── Divider ──
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E5F5",
  },
  dividerText: {
    fontSize: 11,
    color: "#9EA3BB",
    fontWeight: "500",
    letterSpacing: 0.3,
  },

  // ── Social buttons ──
  socialRow: {
    flexDirection: "row",
    gap: 12,
  },
  socialBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#F2F4FB",
    borderRadius: 12,
    paddingVertical: 13,
    borderWidth: 1.5,
    borderColor: "#E2E5F5",
  },
  socialIcon: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A1D2E",
  },
  socialText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#5C6080",
  },

  // ── Sign up ──
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  signupPrompt: {
    fontSize: 13,
    color: "#5C6080",
    fontWeight: "400",
  },
  signupLink: {
    fontSize: 13,
    fontWeight: "700",
    color: "#E2136E",
    textDecorationLine: "underline",
  },
});

import { useSnippetStore } from "@/stores/useSnippetStore";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const languages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "C++",
  "Java",
  "Go",
  "Ruby",
];

const CreateSnippet = () => {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState(languages[0]);
  const [code, setCode] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const addSnippet = useSnippetStore((state) => state.addSnippet);

  const handleSubmit = async () => {
    Alert.alert(
      "Snippet submitted",
      `Title: ${title}\nLanguage: ${language}\nCode length: ${code.length} chars`,
    );
    await addSnippet(title, language, code);
    setTitle("");
    setCode("");
    setDropdownOpen(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create Snippet</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter snippet title"
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Language</Text>
        <Pressable
          style={styles.dropdown}
          onPress={() => setDropdownOpen((prev) => !prev)}
        >
          <Text style={styles.dropdownText}>{language}</Text>
          <Text style={styles.dropdownArrow}>{dropdownOpen ? "▲" : "▼"}</Text>
        </Pressable>
        {dropdownOpen && (
          <View style={styles.dropdownList}>
            {languages.map((item) => (
              <Pressable
                key={item}
                style={styles.dropdownItem}
                onPress={() => {
                  setLanguage(item);
                  setDropdownOpen(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Code Snippet</Text>
        <TextInput
          value={code}
          onChangeText={setCode}
          placeholder="Paste your code here"
          style={[styles.input, styles.codeInput]}
          placeholderTextColor="#999"
          multiline
          textAlignVertical="top"
          numberOfLines={10}
        />
      </View>

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Snippet</Text>
      </Pressable>
    </ScrollView>
  );
};

export default CreateSnippet;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    minHeight: "100%",
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.select({ ios: 14, android: 10 }),
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#f8fafc",
  },
  codeInput: {
    minHeight: 180,
    fontFamily: Platform.select({ ios: "Courier", android: "monospace" }),
    lineHeight: 22,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: "#f8fafc",
  },
  dropdownText: {
    fontSize: 16,
    color: "#111827",
  },
  dropdownArrow: {
    fontSize: 14,
    color: "#6b7280",
  },
  dropdownList: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#111827",
  },
  submitButton: {
    marginTop: 12,
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

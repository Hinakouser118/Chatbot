import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const MyOpenAIApp = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateText = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt: inputText,
          max_tokens: 100,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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',
          },
        }
      );

      setOutputText(response.data.choices[0].text);
    } catch (error) {
      console.error('Error fetching data from OpenAI:', error);
      setError('Error generating text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>OpenAI Text Generation</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a prompt"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />

      <Button title="Generate Text" onPress={generateText} />

      {loading && <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {outputText && (
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>{outputText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    marginTop: 20,
    color: 'red',
    fontSize: 16,
  },
  outputContainer: {
    marginTop: 20,
    padding: 10,
    
  },
  outputText: {
    fontSize: 16,
  },
});

export default MyOpenAIApp;
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function ChatGPT() {
  const [data, setData] = useState([]);
  const apikey = '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';
  const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
  const [textInput, setTextInput] = useState('');

  const handleSend = async () => {
    const prompt = textInput;
    const response = await axios.post(
      apiUrl,
      {
        prompt: prompt,
        max_tokens: 1024,
        temperature: 0.5,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apikey}`,
        },
      }
    );
    const text = response.data.choices[0].text;
    setData([...data, { type: 'user', text: textInput }, { type: 'bot', text: text }]);
    setTextInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ChatBot</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <Text style={{ fontWeight: 'bold', color: item.type === 'user' ? 'green' : 'red' }}>
              {item.type === 'user' ? 'Hina: ' : 'Bot: '}
            </Text>
            <Text style={styles.bot}>{item.text}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={textInput}
        onChangeText={(text) => setTextInput(text)}
        placeholder="Ask me anything"
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Let's Go</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    margin: 10,
  },
  bot: {
    fontSize: 16,
    textAlign: 'center',
    marginRight:'10%'
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: '110%',
    height: 50,
    marginBottom: 10,
    borderRadius: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'yellow',
    width: '110%',
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
});

// import React, { useState } from 'react';
// import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
// import axios from 'axios';

// export default function ChatGPT() {
//   const [userResults, setUserResults] = useState([]);
//   const [conversation, setConversation] = useState([]);
//   const apikey = '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';
//   const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
//   const [textInput, setTextInput] = useState('');

//   const handleNewChat = () => {
//     setUserResults([]);
//     setConversation([]);
//   };

//   const handleSend = async () => {
//     const prompt = textInput;
//     const response = await axios.post(
//       apiUrl,
//       {
//         prompt: prompt,
//         max_tokens: 1024,
//         temperature: 0.5,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${apikey}`,
//         },
//       }
//     );
//     const text = response.data.choices[0].text;

//     setUserResults([...userResults, textInput]);
//     setConversation([...conversation, { type: 'user', text: textInput }, { type: 'bot', text }]);

//     setTextInput('');
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.leftContainer}>
//         <Text style={styles.title1}>OldSearche</Text>
//         <TouchableOpacity style={styles.newChatButton} onPress={handleNewChat}>
//           <Text style={styles.buttonText}>New Chat</Text>
//         </TouchableOpacity>
//         {userResults.map((result, index) => (
//           <TouchableOpacity key={index} style={styles.resultItem}>
//             <Text style={styles.resultText}>{result}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <View style={styles.rightContainer}>
//         <View style={styles.chatHeader}>
//           <Text style={styles.title}>ChatBot</Text>
//         </View>

//         <FlatList
//           data={conversation}
//           keyExtractor={(item, index) => index.toString()}
//           style={styles.conversation}
//           renderItem={({ item }) => (
//             <View
//               style={{
//                 flexDirection: 'row',
//                 padding: 10,
//                 justifyContent: item.type === 'user' ? 'flex-start' : 'flex-end',
//               }}
//             >

//               {item.type === 'user' && (
//                 <Text style={styles.userText}>{item.type}: {item.text}</Text>
//               )}
//               {item.type === 'bot' && (
//                 <Text style={styles.bot}>{item.type}: {item.text}</Text>
//               )}
//             </View>
//           )}
//         />

//         <TextInput
//           style={styles.input}
//           value={textInput}
//           onChangeText={(text) => setTextInput(text)}
//           placeholder="Ask me anything"
//         />
//         <TouchableOpacity style={styles.button} onPress={handleSend}>
//           <Text style={styles.buttonText}>Let's Go</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: 'grey',
//     alignItems: 'flex-start',
//     padding: 20,
//   },
//   leftContainer: {
//     flex: 1,
//     marginRight: 10,
//     backgroundColor: 'black',
//     padding: 10,
//     top:30
    
//   },
//   rightContainer: {
//     flex: 2,
//     marginLeft: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: 'black',
//     top:30,
//     justifyContent:'center'
//   },
//   title1: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: 'white',
//   },
//   chatHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   newChatButton: {
//     backgroundColor: 'yellow',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 10,
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'blue',
//   },
//   conversation: {
//     flex: 1,
//     backgroundColor: 'grey',
//     width: '100%',
//     margin: 10,
//   },
//   bot: {
//     fontSize: 16,
//     // marginLeft: 5,
//     // marginRight: 5,
//     // textAlign: 'center',
//     color: 'white',
//   },
//   userText: {
//     fontSize: 16,
//     // marginLeft: 5,
//     // marginRight: 5,
//     textAlign: 'left',
//     color: 'white',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'black',
//     width: '100%',
//     height: 60,
//     marginBottom: 10,
//     borderRadius: 10,
//     paddingLeft: 10,
//   },
//   button: {
//     backgroundColor: 'yellow',
//     width: '100%',
//     height: 60,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   resultItem: {
//     marginBottom: 10,
//     padding: 10,
//     backgroundColor: '',
//     borderRadius: 5,
//   },
//   resultText: {
//     fontSize: 16,
//     color: 'white',
//   },
// });

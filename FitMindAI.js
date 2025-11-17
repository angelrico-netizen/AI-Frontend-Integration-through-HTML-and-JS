import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const OPENAI_API_KEY = 'INSERT API KEY HERE';

const FitMindAI = () => {
    const [conversation, setConversation] = useState([]); // Stores chat messages
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);

    const cannedQuestions = [
        "Create a beginner workout plan for me",
        "Suggest reps/sets for my goals",
        "What foods/diets are best for my weight",
        "Provide calorie and meal composition for foods",
        "Give me motivation and support"
    ];

    // Handle sending message
    const sendMessage = async () => {
        if (!userInput.trim()) return;

        // Add user message
        const userMessage = { text: userInput, sender: 'user' };
        setConversation(prev => [...prev, userMessage]);
        setUserInput('');
        setLoading(true);

        const systemPrompt = `
You are FitMind AI, a knowledgeable and supportive fitness coach. 
Respond concisely and with evidence-based advice under 200 words. 
Handle the following user queries: 
- Training programs and routines
- Reps/sets suggestions based on goals
- Nutrition advice, calorie and meal composition
- Motivation and support
- Customer support and app improvement guidance
- Assisting users in manually creating workout/diet routines
Be encouraging, professional, and actionable.
    `;

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'system', content: systemPrompt }, ...conversation.map(msg => ({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.text }))],
                    max_tokens: 300
                })
            });

            const data = await response.json();
            let aiText = data.choices[0].message.content.trim();

            // Enforce 200-word max
            const words = aiText.split(/\s+/);
            if (words.length > 200) aiText = words.slice(0, 200).join(' ') + '...';
            const aiMessage = { text: aiText, sender: 'ai', wordCount: Math.min(words.length, 200) };

            setConversation(prev => [...prev, aiMessage]);
        } catch (err) {
            const errorMsg = { text: `Error: ${err.message}`, sender: 'ai' };
            setConversation(prev => [...prev, errorMsg]);
        } finally {
            setLoading(false);
        }
    };

    // Fill input with canned question
    const fillQuestion = (text) => setUserInput(text);

    // Clear chat
    const clearChat = () => setConversation([]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>FitMind AI Chatbot</Text>

            {/* Canned Questions */}
            <ScrollView horizontal style={styles.cannedContainer}>
                {cannedQuestions.map((q, i) => (
                    <TouchableOpacity key={i} style={styles.cannedButton} onPress={() => fillQuestion(q)}>
                        <Text style={styles.cannedText}>{q}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Chat messages */}
            <ScrollView style={styles.chatContainer}>
                {conversation.map((msg, i) => (
                    <View key={i} style={[styles.message, msg.sender === 'user' ? styles.userMsg : styles.aiMsg]}>
                        <Text>{msg.text}</Text>
                        {msg.sender === 'ai' && msg.wordCount && (
                            <Text style={styles.meta}>Word count: {msg.wordCount}</Text>
                        )}
                        {msg.sender === 'ai' && (
                            <View style={styles.supportButtons}>
                                <Button title="Support" onPress={() => Alert.alert('Thanks for supporting!')} />
                                <Button title="Don't Support" onPress={() => Alert.alert('Thanks for feedback!')} />
                            </View>
                        )}
                    </View>
                ))}
                {loading && <Text style={styles.loading}>FitMind AI is thinking...</Text>}
            </ScrollView>

            {/* Input area */}
            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Ask FitMind AI about workouts, nutrition, or motivation..."
                    value={userInput}
                    onChangeText={setUserInput}
                    editable={!loading}
                />
                <Button title="Send" onPress={sendMessage} disabled={loading} />
                <Button title="Clear" onPress={clearChat} />
            </View>
        </View>
    );
};

export default FitMindAI;

// -------------------
// Styles
// -------------------
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F0FFF4', padding: 10 },
    header: { backgroundColor: '#A8E6CF', padding: 15, fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#000', marginBottom: 10 },
    cannedContainer: { marginBottom: 10 },
    cannedButton: { backgroundColor: '#333', padding: 8, borderRadius: 8, marginRight: 6 },
    cannedText: { color: '#A8E6CF', fontSize: 14 },
    chatContainer: { flex: 1, marginBottom: 10 },
    message: { padding: 12, borderRadius: 12, marginVertical: 4, maxWidth: '80%' },
    userMsg: { backgroundColor: '#333', alignSelf: 'flex-end', color: '#A8E6CF' },
    aiMsg: { backgroundColor: '#A8E6CF', alignSelf: 'flex-start' },
    meta: { fontSize: 10, color: '#555', marginTop: 4 },
    supportButtons: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 4 },
    inputArea: { flexDirection: 'row', gap: 6, alignItems: 'center' },
    input: { flex: 1, borderColor: '#333', borderWidth: 1, borderRadius: 8, padding: 10, backgroundColor: '#fff' },
    loading: { fontStyle: 'italic', marginVertical: 4 }
});

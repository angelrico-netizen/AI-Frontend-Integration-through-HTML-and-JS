README.txt - FitMind AI Chatbot (HTML Front-End Demo)
-----------------------------------------------------

Project Overview:
-----------------
FitMind AI is a **fitness-focused AI chatbot demo** built entirely with **HTML, CSS, and JavaScript**.
This project demonstrates **front-end AI integration** by allowing users to interact with the OpenAI API directly 
from the browser without any backend server. The AI provides fitness guidance, nutrition advice, motivation, 
and customer support features.

Purpose:
--------
This project showcases the developer's role in **connecting AI to a front-end interface** and supporting 
the following user stories:

1. Users can ask about training regimens and programs.
2. Users can request reps/sets recommendations according to goals and training type.
3. Users can ask for best foods/diets based on their weight/body goals.
4. AI can provide nutrition guidance, including calorie counts and meal composition.
5. Users can receive motivation and support.
6. Users can manually create workout/diet routines.
7. AI supports customer queries about app improvements.
8. AI responses are **limited to 200 words maximum**.

File Description:
-----------------
1. **fittrack.html** - The single-file front-end application:
   - Contains all HTML, CSS, and JavaScript for the chat interface.
   - Features a header, canned questions, chat container, user input area, and buttons.
   - Handles API calls directly from the browser using fetch().
   - Includes responsive design for desktop and mobile.

2. **Optional: FitMindAI.js** (for React Native projects):
   - React Native component implementing the same AI chat interface.
   - Handles state management, API calls, and user interactions.
   - Compatible with iOS and Android when run within a React Native app.

Key Features:
-------------
- **Canned Questions:** Quick access buttons for common queries.
- **Custom Questions:** Users can type any fitness-related query.
- **AI Integration:** Calls OpenAI API directly from front-end (no backend required).
- **Chat UI:** Modern messaging-style interface; user messages on the right, AI on the left.
- **Support Feedback:** “Support” and “Don’t Support” buttons under AI messages.
- **Word Count:** AI responses limited to 200 words with count displayed.
- **Clear Chat:** Reset conversation at any time.
- **Responsive Design:** Works on both desktop and mobile browsers.

Setup Instructions:
-------------------
1. **Open the HTML file directly in a modern browser** (Chrome, Firefox, Edge, Safari).
2. Ensure you have an active **OpenAI API key**.
   - In the HTML file, set your API key in the `OPENAI_API_KEY` variable.
   - Example:
     const OPENAI_API_KEY = "YOUR_API_KEY_HERE";
3. **Type a question** or click a canned question to interact with the AI.
4. **Send** button submits the query; AI responds in the chat container.
5. Use the **Clear** button to reset the conversation.

Notes:
------
- This is a **front-end demo only**; API keys are stored in memory and are not persistent.
- Designed for demonstration purposes to showcase AI integration with a chat interface.
- For a production app, a **secure backend** should be used to handle API requests and protect the API key.

Credits:
--------
Developed by: [Your Name]  
Course: CS1200 - [University/High School Name]  
Role: AI Integration & Front-End Implementation

-----------------------------------------------------

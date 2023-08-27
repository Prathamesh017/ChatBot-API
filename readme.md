Chat-BOT API DOCUMENATION

Welcome to the Chat Bot  API documentation. This API allows you to see products ,add and remove them from cart and place order 

Installation Steps
```bash
npm install
npm run server
```



## Authentication
This API requires API key authentication. Include your API key in the Authorization header of your requests.

## ENDPOINTS
- USER </br>

 a) /api/users  Creates a New User  </br>
 Method - Post. </br>
 Request - {  _
  email,       _
 name,       _
 password  _
 }</br>
 Response  - Token (Use this for authentication)  </br>
 
 b) /api/users  -  list all users </br>
 Method - Get </br>
 Response  - List All Users </br>

 c) /api/users/:id  -  list a users </br>
 Method - Get </br>
 Response  - List A Users </br>

 d) /api/users/:id  -  updates a users </br>
 Method - Put </br>
 Authenicate - Requires Token </br>
 Response  - Updates A Users </br>

 e) /api/users/:id  -  delete a users </br>
 Method - Delete </br>
 Authenicate - Requires Token </br>
 Response  - Delete A Users </br>
 
 - ChatBot </br>
 
  a) /users/:userId/chatbots -  Create A Chatbot for User </br>
  Method - Post  </br>
  Authenicate - Requires User Token </br>
  Response  - Created Chatbot</br>
   
  b) /users/:userId/chatbots -  List all chatbots for a user </br>
  Method - Get </br>
  Response  - Get all Chatbots</br>

  c) /chatbots/:chatbotId -  Retrieve a single chatbot </br>
  Method - Get </br>
  Authenicate - Requires User Token </br>
  Response  - Get a Chatbot</br>

  d) /chatbots/:chatbotId -  Update a chatbot </br>
  Method - Put </br>
  Authenicate - Requires User Token </br>
  Response  - Update a Chatbot</br>

  e) /chatbots/:chatbotId -  delete a chatbot </br>
   Method - Delete </br>
   Authenicate - Requires User Token </br>
   Response  - Delete a Chatbot</br>

- Conversations </br>

  a) chatbots/:chatbotId/conversations  Start a New Chat </br>
  Method - Post. </br>
  Request - {  _
  message       _
  complete:true/false,       _
  }</br>
  Authenicate - Requires End User Token </br>
  Response  - chats  </br>
 
  b) /chatbots/:chatbotId/conversations  -  List all conversations for a chatbot </br>
  Method - Get </br>
  Authenicate - Requires End User Token </br>
  Response  - List All end Users </br>

  c) conversations/:conversationId - Retrive Single Communication   </br>
  Method - Get </br>
  Authenicate - Requires End User Token </br>
  Response  - Retrieve a single conversation </br>

  d) /conversations/:conversationId -   Update a conversation</br>
  Method - Put </br>
  Authenicate - Requires End User Token </br>
  Response  -  Update a conversation</br>

  e) /conversations/:conversationId  -  End/delete a conversation</br>
  Method - Delete </br>
  Authenicate - Requires End User Token </br>
  Response  - Delete A End Users </br>

- END USERS </br>

 a) /api/endusers  Creates a New End User  </br>
 Method - Post. </br>
 Request - {  _
  email,       _
  name,       _
  }</br>
 Response  - Token (Use this for authentication)  </br>
 
 b) /api/endusers  -  list all end users </br>
 Method - Get </br>
 Authenicate - Requires User Token </br>
 Response  - List All end Users </br>

c) /api/endusers/:id  -  list a users </br>
Method - Get </br>
Authenicate - Requires User Token </br>
Response  - List A end Users </br>

d) /api/endusers/:id  -  updates a users </br>
Method - Put </br>
Authenicate - Requires Token </br>
Response  - Updates A End Users </br>

e) /api/endusers/:id  -  delete a users </br>
Method - Delete </br>
Authenicate - Requires Token </br>
  Response  - Delete A Users </br>

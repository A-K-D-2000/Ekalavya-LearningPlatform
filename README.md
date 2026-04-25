<h1>Ekalavya: Learning Platform</h1>

<p>A full-stack MERN-based learning platform designed to help users manage, track, and improve their learning progress efficiently.</p>


<img width="1645" height="954" alt="image" src="https://github.com/user-attachments/assets/82187ce6-e1ba-4d37-a546-c3cd5e5b77b1" />

<h2>Table of Contents</h2>
<ul>
<li>Features</li>
<li>Tools and Technologies</li>
<li>Dependencies</li>
<li>Prerequisites</li>
<li>Installation and Setup</li>
<li>Database Configuration</li>
<li>Project Structure</li>
<li>API Endpoints</li>
<li>Frontend Pages</li>
<li>NPM Scripts</li>
<li>Notes</li>
</ul>

<h2>Features</h2>

<h3>User Features</h3>
<ul>
<li>User Signup and Login</li>
<li>Secure Authentication</li>
<li>Dashboard to track learning progress</li>
<li>View completed and pending topics</li>
<li>Add, update, and delete learning items</li>
<li>User profile management</li>
</ul>

<h3>Developer Features</h3>
<ul>
<li>RESTful API architecture</li>
<li>Protected routes (frontend and backend)</li>
<li>Modular backend structure</li>
<li>API integration using Axios</li>
<li>Error handling and validations</li>
<li>Scalable project structure</li>
</ul>

<h2>Tools and Technologies</h2>
<ul>
<li>Frontend: React.js</li>
<li>Backend: Node.js + Express.js</li>
<li>Database: MongoDB</li>
<li>API Testing: Postman</li>
<li>Version Control: GitHub</li>
</ul>

<h2>Dependencies</h2>

<h3>Backend</h3>
<ul>
<li>express</li>
<li>mongoose</li>
<li>cors</li>
<li>jsonwebtoken</li>
</ul>

<h3>Frontend</h3>
<ul>
<li>react</li>
<li>react-router-dom</li>
<li>axios</li>
</ul>

<h2>Prerequisites</h2>
<ul>
<li>Node.js installed</li>
<li>npm installed</li>
<li>MongoDB database (local or MongoDB Atlas)</li>
<li>Code editor (recommended: VS Code)</li>
</ul>

<h2>Installation and Setup</h2>

<h3>1. Clone the Repository</h3>
<pre><code>git clone https://github.com/A-K-D-2000/Ekalavya-LearningPlatform.git
cd Ekalavya-LearningPlatform</code></pre>

<h3>2. Install Dependencies</h3>

<p><b>Root:</b></p>
<pre><code>npm install</code></pre>

<p><b>Backend:</b></p>
<pre><code>cd server
npm install</code></pre>

<p><b>Frontend:</b></p>
<pre><code>cd ../client
npm install</code></pre>

<h2>Database Configuration</h2>

<p>Go to your MongoDB setup and get your connection string.</p>

<pre><code>mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster0.mongodb.net/your-db-name</code></pre>

<p>Open the file:</p>
<pre><code>server/config/db.js</code></pre>

<p>Replace:</p>
<pre><code>YOUR_MONGODB_CONNECTION_STRING</code></pre>

<p>with your actual MongoDB connection string.</p>

<h2>Run the Application</h2>

<p><b>Start Backend (from root folder):</b></p>
<pre><code>node server/server.js</code></pre>

<p><b>Start Frontend:</b></p>
<pre><code>cd client
npm run dev</code></pre>

<h2>Application URLs</h2>
<ul>
<li>Frontend: http://localhost:3000</li>
<li>Backend: http://localhost:5000</li>
</ul>

<h2>Project Structure (after installing dependencies)</h2>

<pre><code>Ekalavya-LearningPlatform/
│
├── client/
│   ├── node_modules/
│   └── ...
│
├── server/
│   └── ...
│
├── src/
│
├── node_modules/
├── package.json
├── package-lock.json
</code></pre>

<p><i>Note: Dependencies are installed in both root and client folders. Run npm install in both locations.</i></p>

<h2>API Endpoints</h2>

<h3>Auth</h3>
<ul>
<li>POST /api/auth/register</li>
<li>POST /api/auth/login</li>
</ul>

<h3>Learning</h3>
<ul>
<li>GET /api/learning</li>
<li>POST /api/learning</li>
<li>PUT /api/learning/:id</li>
<li>DELETE /api/learning/:id</li>
</ul>

<h3>User</h3>
<ul>
<li>GET /api/user/profile</li>
</ul>

<h2>Frontend Pages</h2>
<ul>
<li>/ - Home / Dashboard</li>
<li>/login - Login page</li>
<li>/register - Signup page</li>
<li>/dashboard - Learning dashboard</li>
<li>/profile - User profile</li>
</ul>

<h2>NPM Scripts</h2>

<p><b>Server:</b></p>
<pre><code> node server/server.js</code></pre>

<p><b>Client:</b></p>
<pre><code> npm run dev</code></pre>

<h2>Notes</h2>
<ul>
<li>node_modules folders are not included in the repository</li>
<li>They will be created automatically after running npm install</li>
<li>Run npm install before starting the project</li>
<li>Ensure MongoDB connection string is correctly configured</li>
</ul>

<h2>Future Improvements</h2>
<ul>
<li>Notifications and reminders</li>
<li>Improved UI/UX</li>
<li>Progress analytics</li>
<li>Mobile responsiveness</li>
</ul>

<h2>Authors</h2>
<ul>
<li>Amita Kumari</li>
<li>Anaaya Bhattacharya</li>
<li>Anjali Gour</li>
</ul>

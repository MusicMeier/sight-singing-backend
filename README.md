# sight-singing-backend
<i>For most of the readme refer to frontend</i>

<h2>Setup options:</h2>

### `npm install`

### `npm start`

<i>If you don't have nodemon on your local environment use:</i>

### `node index.js`

###Docker Setup:

<p>Inside of your terminal run: <code>docker build -t sight-singing-backend-app:lts -f Dockerfile .</code></p>
<p>Once the container is built, run: <code>docker run -d -p 8003:8003 --name sight-singing-backend-app sight-singing-backend-app:lst </code></p>
<br>
<p>On your browser you can see the code by going to "localhost:8003" from there you can go to /frequencis or /notes to see database information.</p>

// web-app/app.js
const express = require('express');
const app = express();
const axios = require('axios');

app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <button id="change-name-button">Change Name</button>
        <script>
          document.getElementById("change-name-button").addEventListener("click", async () => {
            try {
              const response = await axios.post('http://myserver:8080/change-name', { name: 'new-name' });
              console.log(response.data);
            } catch (err) {
              console.error(err);
            }
          });
        </script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Web app listening on port 3000!');
});

const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('public'));

// Endpoint to fetch chart page
app.get('/chart', async (req, res) => {
    const playerName = req.query.player || 'Unknown Player';
    let playerData = [0, 0, 0]; // Default data in case of an error

    try {
        // Make a request to your local API to get player stats
        const response = await fetch(`http://localhost:3000/api/tennis?query=${encodeURIComponent(playerName)}`);
        const data = await response.json();

        // Extract data for the chart (assuming data.summaries contains the relevant data)
        if (data && data.summaries && data.summaries.length > 0) {
            const latestMatch = data.summaries[0]; // Get the latest match data
            const playerStats = latestMatch.statistics.totals.competitors.find(c => c.name.toLowerCase() === playerName.toLowerCase());

            if (playerStats) {
                // Set the playerData array to reflect actual stats dynamically
                playerData = [
                    playerStats.statistics.aces || 0,
                    playerStats.statistics.breakpoints_won || 0,
                    playerStats.statistics.games_won || 0
                ];
            }
        }
    } catch (error) {
        console.error('Error fetching player data:', error);
    }

    // Send the dynamic HTML with the chart
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Player Stats Chart</title>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </head>
        <body>
            <canvas id="playerChart" width="600" height="400"></canvas>
            <script>
                const ctx = document.getElementById('playerChart').getContext('2d');
                const chartData = {
                    labels: ['Aces', 'Break Points Won', 'Combined Games Won'],
                    datasets: [{
                        label: 'Stats for ${playerName}',
                        data: ${JSON.stringify(playerData)}, // Use dynamic data fetched from the API
                        backgroundColor: ['green', 'blue', 'orange'],
                    }]
                };
                new Chart(ctx, { type: 'bar', data: chartData });
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());

// Serve the root path for testing
app.get('/', (req, res) => {
  res.send('Hello! Your server is running.');
});

// API endpoint to fetch player data
app.get('/api/tennis', async (req, res) => {
  const query = req.query.query; // Get the query from the request (should be a player ID)

  if (!query || !query.startsWith('sr:competitor:')) {
    return res.status(400).json({ error: 'A valid player ID (e.g., sr:competitor:14882) is required.' });
  }

  try {
    const response = await fetch(`https://api.sportradar.com/tennis/trial/v3/en/competitors/${encodeURIComponent(query)}/summaries.json?api_key=C72pE5g4l28jrkw4CtZZV6qErR1Hq3yK5ExVjWXV`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching data:', err.message);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Endpoint to generate and serve the chart dynamically
app.get('/chart', async (req, res) => {
  const playerName = req.query.player || 'Unknown Player';

  // Map player names to IDs
  const playerNamesToIds = {
    'novak djokovic': 'sr:competitor:14882',
    'alexander zverev': 'sr:competitor:57163',
    'quentin halys': 'sr:competitor:90798',
  };

  const playerId = playerNamesToIds[playerName.toLowerCase()];
  if (!playerId) {
    res.send(`<h1>No data found for ${playerName}</h1>`);
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/tennis?query=${encodeURIComponent(playerId)}`);
    const data = await response.json();

    if (!data.summaries || data.summaries.length === 0) {
      res.send(`<h1>No data found for ${playerName}</h1>`);
      return;
    }

    // Prepare match stats from data
    const summaries = data.summaries.slice(0, 10);
    const matchStats = [];

    summaries.forEach((match) => {
      if (!match.statistics || !match.statistics.totals) {
        return;
      }

      const competitors = match.statistics.totals.competitors;
      const playerStats = competitors.find(c => c.id === playerId);
      const opponentStats = competitors.find(c => c.id !== playerId);

      if (playerStats && opponentStats) {
        const periodScores = match.sport_event_status.period_scores;
        let setsWon = 0;
        let setsLost = 0;

        // Calculate sets won and lost by the player
        periodScores.forEach(score => {
          const playerIsHome = playerStats.qualifier === 'home';
          const playerScore = playerIsHome ? score.home_score : score.away_score;
          const opponentScore = playerIsHome ? score.away_score : score.home_score;

          if (playerScore > opponentScore) {
            setsWon++;
          } else if (opponentScore > playerScore) {
            setsLost++;
          }
        });

        const matchData = {
          date: match.sport_event.start_time.substring(0, 10),
          playerAces: playerStats.statistics.aces || 0,
          playerBreakPointsWon: playerStats.statistics.breakpoints_won || 0,
          playerGamesWon: playerStats.statistics.games_won || 0,
          opponentName: opponentStats.name,
          opponentAces: opponentStats.statistics.aces || 0,
          opponentGamesWon: opponentStats.statistics.games_won || 0,
          setsWon: setsWon,
          setsLost: setsLost
        };

        matchData.fantasyScore = 10;
        matchData.fantasyScore += parseInt(matchData.playerGamesWon) || 0;
        matchData.fantasyScore -= parseInt(matchData.opponentGamesWon) || 0;
        matchData.fantasyScore += matchData.setsWon * 3; 
        matchData.fantasyScore -= matchData.setsLost * 3; 
        matchData.fantasyScore += (parseInt(matchData.playerAces) || 0) * 0.5;
        matchData.fantasyScore -= (parseInt(playerStats.statistics.double_faults) || 0) * 0.5;

        matchData.fantasyScore = Math.round(matchData.fantasyScore * 100) / 100;

        if (isNaN(matchData.fantasyScore)) {
          matchData.fantasyScore = 0; 
        }

        matchStats.push(matchData);
      }
    });

    // Serve the HTML for the chart
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${playerName} Stats Chart</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>
        <style>
          body {
            background-color: #1e1e1e;
            color: #d4d4d4;
          }
        </style>
      </head>
      <body>
        <canvas id="playerChart" width="800" height="400"></canvas>
        <script>
          const ctx = document.getElementById('playerChart').getContext('2d');
          const labels = ${JSON.stringify(matchStats.map(match => `vs ${match.opponentName} - ${match.date}`))};
          const playerAces = ${JSON.stringify(matchStats.map(match => match.playerAces))};
          const playerBreakPointsWon = ${JSON.stringify(matchStats.map(match => match.playerBreakPointsWon))};
          const combinedGamesWon = ${JSON.stringify(matchStats.map(match => match.playerGamesWon + match.opponentGamesWon))};
          const fantasyScores = ${JSON.stringify(matchStats.map(match => match.fantasyScore))};

          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [
                { label: 'Player Aces', data: playerAces, backgroundColor: '#32a852' },
                { label: 'Break Points Won', data: playerBreakPointsWon, backgroundColor: '#1e90ff' },
                { label: 'Combined Games Won', data: combinedGamesWon, backgroundColor: '#ffcc00' },
                { label: 'Fantasy Score', data: fantasyScores, backgroundColor: '#f39c12' }
              ]
            },
            options: {
              responsive: true,
              plugins: {
                datalabels: {
                  color: '#ffffff',
                  anchor: 'end',
                  align: 'top',
                  font: { weight: 'bold', size: 12 },
                  formatter: (value, context) => context.chart.data.datasets[context.datasetIndex].label === 'Combined Games Won' ? value.toFixed(1) : value
                }
              },
              scales: {
                y: { beginAtZero: true, grid: { color: '#555' }, ticks: { color: '#d4d4d4' } },
                x: { grid: { color: '#555' }, ticks: { color: '#d4d4d4', font: { size: 8 } } }
              }
            }
          });
        </script>
      </body>
      </html>
    `);
  } catch (err) {
    console.error('Error fetching or processing data:', err.message);
    res.send(`<h1>Error fetching or processing data for ${playerName}</h1>`);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});

// Register the Chart.js Data Labels plugin
Chart.register(ChartDataLabels);

document.getElementById('fetch-data').addEventListener('click', () => {
  let input = document.getElementById('player-id-input').value.trim(); // Get the input value

  const playerNamesToIds = {
    'novak djokovic': 'sr:competitor:14882',
    'alexander zverev': 'sr:competitor:57163',
    'quentin halys': 'sr:competitor:90798',
    // Add more players here...
  };

  const playerIdsToNames = {
    'sr:competitor:14882': 'Novak Djokovic',
    'sr:competitor:57163': 'Alexander Zverev',
    'sr:competitor:90798': 'Quentin Halys',
    // Add more players here...
  };

  // Check if input is a name or just a number
  let playerId = '';

  if (/^\d+$/.test(input)) {
    playerId = `sr:competitor:${input}`;
  } else {
    const formattedName = input.toLowerCase().trim();
    playerId = playerNamesToIds[formattedName];

    if (!playerId) {
      console.error('Player not found. Please enter a valid player name or ID.');
      return;
    }
  }

  const playerName = playerIdsToNames[playerId] || 'Unknown Player';

  fetch(`http://localhost:3000/api/tennis?query=${encodeURIComponent(playerId)}`)
    .then(response => response.json())
    .then(response => {
      if (!response.summaries || response.summaries.length === 0) {
        console.log(`No data found for ${playerName}.`);
        return;
      }

      const summaries = response.summaries.slice(0, 10); // Get only the last 10 matches
      const matchStats = [];

      summaries.forEach((match) => {
        if (!match.statistics || !match.statistics.totals) {
          console.warn('No statistics found for this match.');
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
            date: match.sport_event.start_time.substring(0, 10), // Match date
            playerAces: playerStats.statistics.aces || 0,
            playerBreakPointsWon: playerStats.statistics.breakpoints_won || 0,
            playerGamesWon: playerStats.statistics.games_won || 0,
            opponentName: opponentStats.name,
            opponentAces: opponentStats.statistics.aces || 0,
            opponentGamesWon: opponentStats.statistics.games_won || 0,
            setsWon: setsWon,
            setsLost: setsLost
          };

          matchData.fantasyScore = 10; // +10 points for match played
          matchData.fantasyScore += parseInt(matchData.playerGamesWon) || 0;
          matchData.fantasyScore -= parseInt(matchData.opponentGamesWon) || 0;
          matchData.fantasyScore += matchData.setsWon * 3; 
          matchData.fantasyScore -= matchData.setsLost * 3; 
          matchData.fantasyScore += (parseInt(matchData.playerAces) || 0) * 0.5;
          matchData.fantasyScore -= (parseInt(playerStats.statistics.double_faults) || 0) * 0.5;

          matchData.fantasyScore = Math.round(matchData.fantasyScore * 100) / 100;

          if (isNaN(matchData.fantasyScore)) {
            console.warn('Invalid fantasy score calculated for match on', match.date);
            matchData.fantasyScore = 0; 
          }

          matchStats.push(matchData);
        }
      });

      createMatchChart(playerName, matchStats);
    })
    .catch(err => console.error('Error fetching data:', err));
});

// Define the createMatchChart function
function createMatchChart(playerName, matchStats) {
  const ctx = document.getElementById('playerStatsChart').getContext('2d');

  // Destroy any existing chart instance
  if (window.myChart) {
    window.myChart.destroy();
  }

  // Update the labels to include "vs {Opponent} - {Date}"
  const labels = matchStats.map(match => `vs ${match.opponentName} - ${match.date}`);
  const playerAces = matchStats.map(match => match.playerAces);
  const playerBreakPointsWon = matchStats.map(match => match.playerBreakPointsWon);
  const combinedGamesWon = matchStats.map(match => match.playerGamesWon + match.opponentGamesWon);
  const fantasyScores = matchStats.map(match => match.fantasyScore);

  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Player Aces',
          data: playerAces,
          backgroundColor: '#32a852',
        },
        {
          label: 'Break Points Won',
          data: playerBreakPointsWon,
          backgroundColor: '#1e90ff',
        },
        {
          label: 'Combined Games Won',
          data: combinedGamesWon,
          backgroundColor: '#ffcc00',
          datalabels: {
            color: '#ffffff', // White color for visibility
            anchor: 'end',
            align: 'start', // Aligns near the top of the bar
            offset: -20, // Adjusts the vertical position closer to the top, but not exactly at the top
            font: {
              weight: 'bold',
              size: 12 // Adjust font size as needed
            },
          }
        },
        {
          label: 'Fantasy Score',
          data: fantasyScores,
          backgroundColor: '#f39c12',
        }
      ]
    },
    options: {
      responsive: true,
      animation: {
        duration: 1500,
        easing: 'easeOutBounce',
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: '#555',
          },
          ticks: {
            color: '#d4d4d4',
          }
        },
        x: {
          grid: {
            color: '#555',
          },
          ticks: {
            color: '#d4d4d4',
            maxRotation: 45, // Sets rotation angle to 45 degrees for better readability
            minRotation: 45,
            font: {
              size: 8, // Reduced font size by 4px for better fit
            },
            padding: 5, // Adds padding for separation from axis
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: '#d4d4d4',
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw}`;
            }
          }
        },
        datalabels: {
          color: '#ffffff', // White for most labels
          anchor: 'end',
          align: 'top',
          font: {
            weight: 'bold',
            size: 12 // Adjust font size
          },
          padding: {
            top: 5, // Add padding above the label to separate them more
            bottom: 5 // Add padding below the label for balance
          },
          formatter: (value) => value.toLocaleString(),
        }
      },
      barPercentage: 0.7, // Increased space between bars
      categoryPercentage: 0.7, // Increased space between groups
    }
  });
}

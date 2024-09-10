import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000; // Use the port provided by Heroku or fallback to 3000 for local development

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
    'carlos alcaraz': 'sr:competitor:407573',
    'jannik sinner': 'sr:competitor:225050',
    'daniil medvedev': 'sr:competitor:163504',
    'andrey rublev': 'sr:competitor:106755',
    'hubert hurkacz': 'sr:competitor:158896',
    'casper ruud': 'sr:competitor:119248',
    'grigor dimitrov': 'sr:competitor:23581',
    'alex de minaur': 'sr:competitor:214182',
    'stefanos tsitsipas': 'sr:competitor:122366',
    'taylor fritz': 'sr:competitor:136042',
    'ben shelton': 'sr:competitor:808628',
    'tommy paul': 'sr:competitor:138546',
    'holger rune': 'sr:competitor:429603',
    'sebastian korda': 'sr:competitor:203681',
    'ugo humbert': 'sr:competitor:185388',
    'lorenzo musetti': 'sr:competitor:359602',
    'felix auger-aliassime': 'sr:competitor:195800',
    'frances tiafoe': 'sr:competitor:101101',
    'alejandro tabilo': 'sr:competitor:102151',
    'karen khachanov': 'sr:competitor:90080',
    'sebastian baez': 'sr:competitor:257721',
    'arthur fils': 'sr:competitor:671637',
    'jack draper': 'sr:competitor:352776',
    'nicolas jarry': 'sr:competitor:89632',
    'alexander bublik': 'sr:competitor:163480',
    'alexei popyrin': 'sr:competitor:128552',
    'francisco cerundolo': 'sr:competitor:255595',
    'matteo arnaldi': 'sr:competitor:505550',
    'flavio cobolli': 'sr:competitor:399637',
    'jordan thompson': 'sr:competitor:87690',
    'tomas martin etcheverry': 'sr:competitor:169496',
    'nuno borges': 'sr:competitor:125006',
    'jan-lennard struff': 'sr:competitor:46391',
    'mariano navone': 'sr:competitor:392066',
    'luciano darderi': 'sr:competitor:534043',
    'jiri lehecka': 'sr:competitor:339377',
    'tomas machac': 'sr:competitor:300540',
    'tallon griekspoor': 'sr:competitor:122368',
    'zhizhen zhang': 'sr:competitor:75813',
    'adrian mannarino': 'sr:competitor:15894',
    'pedro martinez': 'sr:competitor:77223',
    'matteo berrettini': 'sr:competitor:112783',
    'gael monfils': 'sr:competitor:14844',
    'marcos giron': 'sr:competitor:42379',
    'cameron norrie': 'sr:competitor:95935',
    'lorenzo sonego': 'sr:competitor:104847',
    'alex michelsen': 'sr:competitor:871495',
    'brandon nakashima': 'sr:competitor:294300',
    'fabian marozsan': 'sr:competitor:254383',
    'giovanni mpetshi perricard': 'sr:competitor:450283',
    'yoshihito nishioka': 'sr:competitor:59281',
    'miomir kecmanovic': 'sr:competitor:130398',
    'roberto carballes baena': 'sr:competitor:51141',
    'arthur rinderknech': 'sr:competitor:63606',
    'roman safiullin': 'sr:competitor:124930',
    'sebastian ofner': 'sr:competitor:83397',
    'alejandro davidovich fokina': 'sr:competitor:157456',
    'pavel kotov': 'sr:competitor:218538',
    'alexander shevchenko': 'sr:competitor:371436',
    'rinky hijikata': 'sr:competitor:299130',
    'hugo gaston': 'sr:competitor:223874',
    'facundo diaz acosta': 'sr:competitor:371476',
    'jakub mensik': 'sr:competitor:763108',
    'dusan lajovic': 'sr:competitor:39234',
    'roberto bautista agut': 'sr:competitor:16720',
    'thiago seyboth wild': 'sr:competitor:161262',
    'corentin moutet': 'sr:competitor:175014',
    'james duckworth': 'sr:competitor:39711',
    'fabio fognini': 'sr:competitor:15434',
    'juncheng shang': 'sr:competitor:721347',
    'sumit nagal': 'sr:competitor:131566',
    'botic van de zandschulp': 'sr:competitor:102339',
    'thiago monteiro': 'sr:competitor:47603',
    'aleksandar kovacevic': 'sr:competitor:188321',
    'alexandre muller': 'sr:competitor:88992',
    'david goffin': 'sr:competitor:25838',
    'federico coria': 'sr:competitor:54573',
    'zizou bergs': 'sr:competitor:170946',
    'marton fucsovics': 'sr:competitor:47770',
    'damir dzumhur': 'sr:competitor:49172',
    'dominik koepfer': 'sr:competitor:129368',
    'jaume munar': 'sr:competitor:126356',
    'emil ruusuvuori': 'sr:competitor:167370',
    'thanasi kokkinakis': 'sr:competitor:71280',
    'christopher oconnell': 'sr:competitor:58221',
    'taro daniel': 'sr:competitor:48632',
    'daniel altmaier': 'sr:competitor:127208',
    'luca nardi': 'sr:competitor:450477',
    'arthur cazaux': 'sr:competitor:445419',
    'aleksandar vukic': 'sr:competitor:124656',
    'camilo ugo carabelli': 'sr:competitor:204117',
    'thiago agustin tirante': 'sr:competitor:256875',
    'adam walton': 'sr:competitor:227358',
    'yannick hanfmann': 'sr:competitor:47975',
    'max purcell': 'sr:competitor:124658',
    'borna coric': 'sr:competitor:64580',
    'aslan karatsev': 'sr:competitor:60502',
    'maximilian marterer': 'sr:competitor:71660',
    'mattia bellucci': 'sr:competitor:472975',
    'zachary svajda': 'sr:competitor:501672',
    'lloyd harris': 'sr:competitor:157808',
    'billy harris': 'sr:competitor:111837',
    'denis shapovalov': 'sr:competitor:117916',
    'christopher eubanks': 'sr:competitor:206879',
    'hugo dellien': 'sr:competitor:57289',
    'francisco comesana': 'sr:competitor:341192',
    'laslo djere': 'sr:competitor:97231',
    'lukas klein': 'sr:competitor:163636',
    'constant lestienne': 'sr:competitor:62790',
    'luca van assche': 'sr:competitor:658475',
    'harold mayot': 'sr:competitor:321667',
    'jozef kovalik': 'sr:competitor:57021',
    'chun hsin tseng': 'sr:competitor:226036',
    'cristian garin': 'sr:competitor:64570',
    'mikhail kukushkin': 'sr:competitor:16683',
    'vit kopriva': 'sr:competitor:210526',
    'quentin halys': 'sr:competitor:90798',
    'terence atmane': 'sr:competitor:399633',
    'valentin vacherot': 'sr:competitor:158912',
    'albert ramos-vinolas': 'sr:competitor:16822',
    'bu yunchaokete': 'sr:competitor:337601',
    'roman andres burruchaga': 'sr:competitor:443702',
    'otto virtanen': 'sr:competitor:276563',
    'facundo bagnis': 'sr:competitor:38183',
    'daniel elahi galan': 'sr:competitor:92074',
    'jesper de jong': 'sr:competitor:310974',
    'benjamin bonzi': 'sr:competitor:94485',
    'leandro riedi': 'sr:competitor:603096',
    'alexander ritschard': 'sr:competitor:56017',
    'pierre-hugues herbert': 'sr:competitor:44553',
    'gregoire barrere': 'sr:competitor:67154',
    'duje ajdukovic': 'sr:competitor:226132',
    'stefano napolitano': 'sr:competitor:42152',
    'richard gasquet': 'sr:competitor:14414',
    'hamad medjedovic': 'sr:competitor:601146',
    'radu albot': 'sr:competitor:44547',
    'felipe meligeni alves': 'sr:competitor:121668',
    'mackenzie mcdonald': 'sr:competitor:63438',
    'marco trungelliti': 'sr:competitor:38517',
    'alejandro moro canas': 'sr:competitor:325737',
    'gabriel diallo': 'sr:competitor:418213',
    'nicolas moreno de alboran': 'sr:competitor:113905',
    'francesco passaro': 'sr:competitor:353530',
    'titouan droguet': 'sr:competitor:309954',
    'lucas pouille': 'sr:competitor:57703',
    'ugo blanchet': 'sr:competitor:213170',
    'coleman wong': 'sr:competitor:449767',
    'gustavo heide': 'sr:competitor:515510',
    'michael mmoh': 'sr:competitor:131442',
    'seongchan hong': 'sr:competitor:97977',
    'shintaro mochizuki': 'sr:competitor:503814',
    'rafael nadal': 'sr:competitor:14486',
    'jaime faria': 'sr:competitor:682911',
    'oriol roca batalla': 'sr:competitor:51100',
    'juan pablo varillas': 'sr:competitor:72248',
    'jacob fearnley': 'sr:competitor:407783',
    'juan manuel cerundolo': 'sr:competitor:258735',
    'marcelo tomas barrios vera': 'sr:competitor:132834',
    'maxime cressy': 'sr:competitor:269521',
    'joao fonseca': 'sr:competitor:863319',
    'august holmgren': 'sr:competitor:226124',
    'henrique rocha': 'sr:competitor:682913',
    'jeffrey john wolf': 'sr:competitor:234048',
    'patrick kypson': 'sr:competitor:234046',
    'kamil majchrzak': 'sr:competitor:108709',
    'marc-andrea huesler': 'sr:competitor:145112',
    'dominic stricker': 'sr:competitor:496346',
    'andrea pellegrino': 'sr:competitor:93597',
    'giulio zeppieri': 'sr:competitor:298122',
    'emilio nava': 'sr:competitor:284805',
    'hugo grenier': 'sr:competitor:107357',
    'alex bolt': 'sr:competitor:58369',
    'matteo gigante': 'sr:competitor:619900',
    'stan wawrinka': 'sr:competitor:14548',
    'nick hardt': 'sr:competitor:186885',
    'henri squire': 'sr:competitor:229022',
    'mitchell krueger': 'sr:competitor:52276',
    'jerome kym': 'sr:competitor:539343',
    'dmitry popko': 'sr:competitor:50901',
    'federico agustin gomez': 'sr:competitor:146040',
    'yu hsiou hsu': 'sr:competitor:220588',
    'daniel evans': 'sr:competitor:16375',
    'vilius gaubas': 'sr:competitor:604238',
    'li tu': 'sr:competitor:49417',
    'murkel dellien': 'sr:competitor:82133',
    'timofey skatov': 'sr:competitor:276685',
    'denis kudla': 'sr:competitor:36595',
    'facundo mena': 'sr:competitor:38180',
    'learner tien': 'sr:competitor:891669',
    'paul jubb': 'sr:competitor:242548',
    'tristan schoolkate': 'sr:competitor:405977',
    'maks kasnikowski': 'sr:competitor:685469',
    'enzo couacaud': 'sr:competitor:74441',
    'benjamin hassan': 'sr:competitor:108767',
    'yasutaka uchiyama': 'sr:competitor:46390',
    'matteo martineau': 'sr:competitor:145122',
    'raphael collignon': 'sr:competitor:739641',
    'valentin royer': 'sr:competitor:341220',
    'calvin hemery': 'sr:competitor:81271',
    'jurij rodionov': 'sr:competitor:212004',
    'marc polmans': 'sr:competitor:80665',
    'borna gojo': 'sr:competitor:124916',
    'martin damm jr': 'sr:competitor:51345',
    'andrea vavassori': 'sr:competitor:95801',
    'denis yevseyev': 'sr:competitor:50847',
    'brandon holt': 'sr:competitor:226050',
    'kyrian jacquet': 'sr:competitor:382058',
    'dominic thiem': 'sr:competitor:43748',
    'joris de loore': 'sr:competitor:45258',
    'zsombor piros': 'sr:competitor:223714',
    'pablo carreno busta': 'sr:competitor:40800',
    'stefano travaglia': 'sr:competitor:36300',
    'abdullah shelbayh': 'sr:competitor:428657',
    'pedro cachin': 'sr:competitor:73987',
    'antoine escoffier': 'sr:competitor:49663',
    'beibit zhukayev': 'sr:competitor:286541',
    'maxime janvier': 'sr:competitor:107625',
    'alexis galarneau': 'sr:competitor:187689',
    'javier barranco cosano': 'sr:competitor:177686',
    'kei nishikori': 'sr:competitor:15733',
    'elias ymer': 'sr:competitor:83661',
    'filip misolic': 'sr:competitor:248779',
    'oliver crawford': 'sr:competitor:240876',
    'gijs brouwer': 'sr:competitor:104967',
    'aziz dougaz': 'sr:competitor:172482',
    'milos raonic': 'sr:competitor:18111',
    'nicolas mejia': 'sr:competitor:138528',
    'tristan boyer': 'sr:competitor:284801',
    'federico arnaboldi': 'sr:competitor:265559',
    'benoit paire': 'sr:competitor:22218',
    'filip cristian jianu': 'sr:competitor:279295',
    'carlos taberner': 'sr:competitor:108559',
    'bernard tomic': 'sr:competitor:17080',
    'ethan quinn': 'sr:competitor:655845',
    'santiago rodriguez taverna': 'sr:competitor:185434',
    'dennis novak': 'sr:competitor:59304',
    'sho shimabukuro': 'sr:competitor:247607',
    'pablo llamas ruiz': 'sr:competitor:371448',
    'daniel rincon': 'sr:competitor:530317',
    'andrea collarini': 'sr:competitor:43761',
    'clement chidekh': 'sr:competitor:283759',
    'diego schwartzman': 'sr:competitor:48599',
    'bernabe zapata miralles': 'sr:competitor:108565',
    'omar jasika': 'sr:competitor:79467',
    'mark lajal': 'sr:competitor:801386',
    'yuta shimizu': 'sr:competitor:250231',
    'geoffrey blancaneaux': 'sr:competitor:141882',
    'andres andrade': 'sr:competitor:168420'
  };

  const playerId = playerNamesToIds[playerName.toLowerCase()];
  if (!playerId) {
    res.send(`<h1>No data found for ${playerName}</h1>`);
    return;
  }

  try {
    const response = await fetch(`http://localhost:${PORT}/api/tennis?query=${encodeURIComponent(playerId)}`);
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

// Start the server and listen on the dynamic port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

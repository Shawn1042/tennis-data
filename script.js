// Register the Chart.js Data Labels plugin
Chart.register(ChartDataLabels);

document.getElementById('fetch-data').addEventListener('click', () => {
  let input = document.getElementById('player-id-input').value.trim(); // Get the input value

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
  'andres andrade': 'sr:competitor:168420',
  };

  
  const playerIdsToNames = {
    'sr:competitor:14882': 'Novak Djokovic',
    'sr:competitor:57163': 'Alexander Zverev',
    'sr:competitor:90798': 'Quentin Halys',
    'sr:competitor:407573': 'Carlos Alcaraz',
    'sr:competitor:225050': 'Jannik Sinner',
    'sr:competitor:163504': 'Daniil Medvedev',
    'sr:competitor:106755': 'Andrey Rublev',
    'sr:competitor:158896': 'Hubert Hurkacz',
    'sr:competitor:119248': 'Casper Ruud',
    'sr:competitor:23581': 'Grigor Dimitrov',
    'sr:competitor:214182': 'Alex de Minaur',
    'sr:competitor:122366': 'Stefanos Tsitsipas',
    'sr:competitor:136042': 'Taylor Fritz',
    'sr:competitor:808628': 'Ben Shelton',
    'sr:competitor:138546': 'Tommy Paul',
    'sr:competitor:429603': 'Holger Rune',
    'sr:competitor:203681': 'Sebastian Korda',
    'sr:competitor:185388': 'Ugo Humbert',
    'sr:competitor:359602': 'Lorenzo Musetti',
    'sr:competitor:195800': 'Felix Auger-Aliassime',
    'sr:competitor:101101': 'Frances Tiafoe',
    'sr:competitor:102151': 'Alejandro Tabilo',
    'sr:competitor:90080': 'Karen Khachanov',
    'sr:competitor:257721': 'Sebastian Baez',
    'sr:competitor:671637': 'Arthur Fils',
    'sr:competitor:352776': 'Jack Draper',
    'sr:competitor:89632': 'Nicolas Jarry',
    'sr:competitor:163480': 'Alexander Bublik',
    'sr:competitor:128552': 'Alexei Popyrin',
    'sr:competitor:255595': 'Francisco Cerundolo',
    'sr:competitor:505550': 'Matteo Arnaldi',
    'sr:competitor:399637': 'Flavio Cobolli',
    'sr:competitor:87690': 'Jordan Thompson',
    'sr:competitor:169496': 'Tomas Martin Etcheverry',
    'sr:competitor:125006': 'Nuno Borges',
    'sr:competitor:46391': 'Jan-Lennard Struff',
    'sr:competitor:392066': 'Mariano Navone',
    'sr:competitor:534043': 'Luciano Darderi',
    'sr:competitor:339377': 'Jiri Lehecka',
    'sr:competitor:300540': 'Tomas Machac',
    'sr:competitor:122368': 'Tallon Griekspoor',
    'sr:competitor:75813': 'Zhizhen Zhang',
    'sr:competitor:15894': 'Adrian Mannarino',
    'sr:competitor:77223': 'Pedro Martinez',
    'sr:competitor:112783': 'Matteo Berrettini',
    'sr:competitor:14844': 'Gael Monfils',
    'sr:competitor:42379': 'Marcos Giron',
    'sr:competitor:95935': 'Cameron Norrie',
    'sr:competitor:104847': 'Lorenzo Sonego',
    'sr:competitor:871495': 'Alex Michelsen',
    'sr:competitor:294300': 'Brandon Nakashima',
    'sr:competitor:254383': 'Fabian Marozsan',
    'sr:competitor:450283': 'Giovanni Mpetshi Perricard',
    'sr:competitor:59281': 'Yoshihito Nishioka',
    'sr:competitor:130398': 'Miomir Kecmanovic',
    'sr:competitor:51141': 'Roberto Carballes Baena',
    'sr:competitor:63606': 'Arthur Rinderknech',
    'sr:competitor:124930': 'Roman Safiullin',
    'sr:competitor:83397': 'Sebastian Ofner',
    'sr:competitor:157456': 'Alejandro Davidovich Fokina',
    'sr:competitor:218538': 'Pavel Kotov',
    'sr:competitor:371436': 'Alexander Shevchenko',
    'sr:competitor:299130': 'Rinky Hijikata',
    'sr:competitor:223874': 'Hugo Gaston',
    'sr:competitor:371476': 'Facundo Diaz Acosta',
    'sr:competitor:763108': 'Jakub Mensik',
    'sr:competitor:39234': 'Dusan Lajovic',
    'sr:competitor:16720': 'Roberto Bautista Agut',
    'sr:competitor:161262': 'Thiago Seyboth Wild',
    'sr:competitor:175014': 'Corentin Moutet',
    'sr:competitor:39711': 'James Duckworth',
    'sr:competitor:15434': 'Fabio Fognini',
    'sr:competitor:721347': 'Juncheng Shang',
    'sr:competitor:131566': 'Sumit Nagal',
    'sr:competitor:102339': 'Botic van de Zandschulp',
    'sr:competitor:47603': 'Thiago Monteiro',
    'sr:competitor:188321': 'Aleksandar Kovacevic',
    'sr:competitor:88992': 'Alexandre Muller',
    'sr:competitor:25838': 'David Goffin',
    'sr:competitor:54573': 'Federico Coria',
    'sr:competitor:170946': 'Zizou Bergs',
    'sr:competitor:47770': 'Marton Fucsovics',
    'sr:competitor:49172': 'Damir Dzumhur',
    'sr:competitor:129368': 'Dominik Koepfer',
    'sr:competitor:126356': 'Jaume Munar',
    'sr:competitor:167370': 'Emil Ruusuvuori',
    'sr:competitor:71280': 'Thanasi Kokkinakis',
    'sr:competitor:58221': 'Christopher Oconnell',
    'sr:competitor:48632': 'Taro Daniel',
    'sr:competitor:127208': 'Daniel Altmaier',
    'sr:competitor:450477': 'Luca Nardi',
    'sr:competitor:445419': 'Arthur Cazaux',
    'sr:competitor:124656': 'Aleksandar Vukic',
    'sr:competitor:204117': 'Camilo Ugo Carabelli',
    'sr:competitor:256875': 'Thiago Agustin Tirante',
    'sr:competitor:227358': 'Adam Walton',
    'sr:competitor:47975': 'Yannick Hanfmann',
    'sr:competitor:124658': 'Max Purcell',
    'sr:competitor:64580': 'Borna Coric',
    'sr:competitor:60502': 'Aslan Karatsev',
    'sr:competitor:71660': 'Maximilian Marterer',
    'sr:competitor:472975': 'Mattia Bellucci',
    'sr:competitor:501672': 'Zachary Svajda',
    'sr:competitor:157808': 'Lloyd Harris',
    'sr:competitor:111837': 'Billy Harris',
    'sr:competitor:117916': 'Denis Shapovalov',
    'sr:competitor:206879': 'Christopher Eubanks',
    'sr:competitor:57289': 'Hugo Dellien',
    'sr:competitor:341192': 'Francisco Comesana',
    'sr:competitor:97231': 'Laslo Djere',
    'sr:competitor:163636': 'Lukas Klein',
    'sr:competitor:62790': 'Constant Lestienne',
    'sr:competitor:658475': 'Luca van Assche',
    'sr:competitor:321667': 'Harold Mayot',
    'sr:competitor:57021': 'Jozef Kovalik',
    'sr:competitor:226036': 'Chun Hsin Tseng',
    'sr:competitor:64570': 'Cristian Garin',
    'sr:competitor:16683': 'Mikhail Kukushkin',
    'sr:competitor:210526': 'Vit Kopriva',
    'sr:competitor:90798': 'Quentin Halys',
    'sr:competitor:399633': 'Terence Atmane',
    'sr:competitor:158912': 'Valentin Vacherot',
    'sr:competitor:16822': 'Albert Ramos-Vinolas',
    'sr:competitor:337601': 'Bu Yunchaokete',
    'sr:competitor:443702': 'Roman Andres Burruchaga',
    'sr:competitor:276563': 'Otto Virtanen',
    'sr:competitor:38183': 'Facundo Bagnis',
    'sr:competitor:92074': 'Daniel Elahi Galan',
    'sr:competitor:310974': 'Jesper de Jong',
    'sr:competitor:94485': 'Benjamin Bonzi',
    'sr:competitor:603096': 'Leandro Riedi',
    'sr:competitor:56017': 'Alexander Ritschard',
    'sr:competitor:44553': 'Pierre-Hugues Herbert',
    'sr:competitor:67154': 'Gregoire Barrere',
    'sr:competitor:226132': 'Duje Ajdukovic',
    'sr:competitor:42152': 'Stefano Napolitano',
    'sr:competitor:14414': 'Richard Gasquet',
    'sr:competitor:601146': 'Hamad Medjedovic',
    'sr:competitor:44547': 'Radu Albot',
    'sr:competitor:121668': 'Felipe Meligeni Alves',
    'sr:competitor:63438': 'Mackenzie McDonald',
    'sr:competitor:38517': 'Marco Trungelliti',
    'sr:competitor:325737': 'Alejandro Moro Canas',
    'sr:competitor:418213': 'Gabriel Diallo',
    'sr:competitor:113905': 'Nicolas Moreno de Alboran',
    'sr:competitor:353530': 'Francesco Passaro',
    'sr:competitor:309954': 'Titouan Droguet',
    'sr:competitor:57703': 'Lucas Pouille',
    'sr:competitor:213170': 'Ugo Blanchet',
    'sr:competitor:449767': 'Coleman Wong',
    'sr:competitor:515510': 'Gustavo Heide',
    'sr:competitor:131442': 'Michael Mmoh',
    'sr:competitor:97977': 'Seongchan Hong',
    'sr:competitor:503814': 'Shintaro Mochizuki',
    'sr:competitor:14486': 'Rafael Nadal',
    'sr:competitor:682911': 'Jaime Faria',
    'sr:competitor:51100': 'Oriol Roca Batalla',
    'sr:competitor:72248': 'Juan Pablo Varillas',
    'sr:competitor:407783': 'Jacob Fearnley',
    'sr:competitor:258735': 'Juan Manuel Cerundolo',
    'sr:competitor:132834': 'Marcelo Tomas Barrios Vera',
    'sr:competitor:269521': 'Maxime Cressy',
    'sr:competitor:863319': 'Joao Fonseca',
    'sr:competitor:226124': 'August Holmgren',
    'sr:competitor:682913': 'Henrique Rocha',
    'sr:competitor:234048': 'Jeffrey John Wolf',
    'sr:competitor:234046': 'Patrick Kypson',
    'sr:competitor:108709': 'Kamil Majchrzak',
    'sr:competitor:145112': 'Marc-Andrea Huesler',
    'sr:competitor:496346': 'Dominic Stricker',
    'sr:competitor:93597': 'Andrea Pellegrino',
    'sr:competitor:298122': 'Giulio Zeppieri',
    'sr:competitor:284805': 'Emilio Nava',
    'sr:competitor:107357': 'Hugo Grenier',
    'sr:competitor:58369': 'Alex Bolt',
    'sr:competitor:619900': 'Matteo Gigante',
    'sr:competitor:14548': 'Stan Wawrinka',
    'sr:competitor:186885': 'Nick Hardt',
    'sr:competitor:229022': 'Henri Squire',
    'sr:competitor:52276': 'Mitchell Krueger',
    'sr:competitor:539343': 'Jerome Kym',
    'sr:competitor:50901': 'Dmitry Popko',
    'sr:competitor:146040': 'Federico Agustin Gomez',
    'sr:competitor:220588': 'Yu Hsiou Hsu',
    'sr:competitor:16375': 'Daniel Evans',
    'sr:competitor:604238': 'Vilius Gaubas',
    'sr:competitor:49417': 'Li Tu',
    'sr:competitor:82133': 'Murkel Dellien',
    'sr:competitor:276685': 'Timofey Skatov',
    'sr:competitor:36595': 'Denis Kudla',
    'sr:competitor:38180': 'Facundo Mena',
    'sr:competitor:891669': 'Learner Tien',
    'sr:competitor:242548': 'Paul Jubb',
    'sr:competitor:405977': 'Tristan Schoolkate',
    'sr:competitor:685469': 'Maks Kasnikowski',
    'sr:competitor:74441': 'Enzo Couacaud',
    'sr:competitor:108767': 'Benjamin Hassan',
    'sr:competitor:46390': 'Yasutaka Uchiyama',
    'sr:competitor:145122': 'Matteo Martineau',
    'sr:competitor:739641': 'Raphael Collignon',
    'sr:competitor:341220': 'Valentin Royer',
    'sr:competitor:81271': 'Calvin Hemery',
    'sr:competitor:212004': 'Jurij Rodionov',
    'sr:competitor:80665': 'Marc Polmans',
    'sr:competitor:124916': 'Borna Gojo',
    'sr:competitor:51345': 'Martin Damm Jr',
    'sr:competitor:95801': 'Andrea Vavassori',
    'sr:competitor:50847': 'Denis Yevseyev',
    'sr:competitor:226050': 'Brandon Holt',
    'sr:competitor:382058': 'Kyrian Jacquet',
    'sr:competitor:43748': 'Dominic Thiem',
    'sr:competitor:45258': 'Joris de Loore',
    'sr:competitor:223714': 'Zsombor Piros',
    'sr:competitor:40800': 'Pablo Carreno Busta',
    'sr:competitor:36300': 'Stefano Travaglia',
    'sr:competitor:428657': 'Abdullah Shelbayh',
    'sr:competitor:73987': 'Pedro Cachin',
    'sr:competitor:49663': 'Antoine Escoffier',
    'sr:competitor:286541': 'Beibit Zhukayev',
    'sr:competitor:107625': 'Maxime Janvier',
    'sr:competitor:187689': 'Alexis Galarneau',
    'sr:competitor:177686': 'Javier Barranco Cosano',
    'sr:competitor:15733': 'Kei Nishikori',
    'sr:competitor:83661': 'Elias Ymer',
    'sr:competitor:248779': 'Filip Misolic',
    'sr:competitor:240876': 'Oliver Crawford',
    'sr:competitor:104967': 'Gijs Brouwer',
    'sr:competitor:172482': 'Aziz Dougaz',
    'sr:competitor:18111': 'Milos Raonic',
    'sr:competitor:138528': 'Nicolas Mejia',
    'sr:competitor:284801': 'Tristan Boyer',
    'sr:competitor:265559': 'Federico Arnaboldi',
    'sr:competitor:22218': 'Benoit Paire',
    'sr:competitor:279295': 'Filip Cristian Jianu',
    'sr:competitor:108559': 'Carlos Taberner',
    'sr:competitor:17080': 'Bernard Tomic',
    'sr:competitor:655845': 'Ethan Quinn',
    'sr:competitor:185434': 'Santiago Rodriguez Taverna',
    'sr:competitor:59304': 'Dennis Novak',
    'sr:competitor:247607': 'Sho Shimabukuro',
    'sr:competitor:371448': 'Pablo Llamas Ruiz',
    'sr:competitor:530317': 'Daniel Rincon',
    'sr:competitor:43761': 'Andrea Collarini',
    'sr:competitor:283759': 'Clement Chidekh',
    'sr:competitor:48599': 'Diego Schwartzman',
    'sr:competitor:108565': 'Bernabe Zapata Miralles',
    'sr:competitor:79467': 'Omar Jasika',
    'sr:competitor:801386': 'Mark Lajal',
    'sr:competitor:250231': 'Yuta Shimizu',
    'sr:competitor:141882': 'Geoffrey Blancaneaux',
    'sr:competitor:168420': 'Andres Andrade'
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

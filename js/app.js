$(document).ready(function()
{
    let currentLang = localStorage.getItem('selectedLang') || 'en';
    let gameInterval;
    let currentRound = 1;
    let hasVoted = false;
    let myVoteId = null;
    const totalRounds = 3;
    let lastRoomData = null;
    window.joining = false;

    const words = 
    {
        "pt": 
        {
            "anime": ["Naruto", "Dragon Ball", "One Piece", "Pokémon", "Death Note", "Attack on Titan", "Demon Slayer", "Fullmetal Alchemist", "Jujutsu Kaisen", "One Punch Man"],
            "characters": ["Naruto", "Goku", "Luffy", "Vegeta", "Pikachu", "Tanjiro", "Sasuke", "Zoro", "Saitama", "Ash Ketchum"],
            "animals": ["Cão", "Gato", "Leão", "Elefante", "Girafa", "Cavalo", "Tubarão", "Águia", "Golfinho", "Coelho", "Tigre", "Urso", "Zebra", "Macaco", "Cobra", "Jacaré", "Baleia", "Pinguim", "Lobo", "Raposa", "Canguru", "Hipopótamo", "Rinoceronte", "Vaca", "Porco", "Ovelha", "Galinha", "Pato", "Rato", "Esquilo", "Morcego", "Tartaruga", "Polvo", "Caranguejo", "Formiga", "Abelha", "Borboleta", "Aranha", "Escorpião", "Sapo", "Camaleão", "Papagaio", "Coruja", "Pavão", "Avestruz", "Panda", "Koala", "Pantera", "Hiena", "Guepardo"],
            "soccer": ["Cristiano Ronaldo", "Lionel Messi", "Neymar", "Kylian Mbappé", "Erling Haaland", "Kevin De Bruyne", "Robert Lewandowski", "Mohamed Salah", "Vinícius Júnior", "Jude Bellingham", "Pelé", "Diego Maradona", "Zinedine Zidane", "Ronaldinho Gaúcho", "Ronaldo Fenómeno", "Johan Cruyff", "Eusébio", "Luís Figo", "David Beckham", "Zico", "Pepe", "Bernardo Silva", "Bruno Fernandes", "Luka Modric", "Karim Benzema", "Manuel Neuer", "Thierry Henry", "Zlatan Ibrahimovic", "Roberto Carlos", "Cafu", "Real Madrid", "FC Barcelona", "Manchester City", "Manchester United", "Liverpool", "Arsenal", "Chelsea", "Bayern Munique", "Borussia Dortmund", "Paris Saint-Germain", "Juventus", "Inter de Milão", "AC Milan", "Benfica", "FC Porto", "Sporting CP", "Flamengo", "Palmeiras", "River Plate", "Boca Juniors", "Ajax", "Napoli", "Atlético de Madrid", "Bayer Leverkusen", "Tottenham", "Al-Nassr", "Inter Miami", "Pep Guardiola", "José Mourinho", "Carlo Ancelotti"],
            "clash-royale": ["Gigante", "Mago", "P.E.K.K.A", "Tronco", "Mineiro", "Príncipe", "Bárbaros", "Esqueletos", "Goblins", "Montapuercos", "Sparky"],
            "countries": ["Portugal", "Espanha", "França", "Itália", "Brasil", "Angola", "Inglaterra", "Alemanha", "Japão", "EUA", "Cabo Verde", "Egito", "Ira", "Israel"],
            "food": ["Bacalhau", "Arroz", "Pizza", "Hambúrguer", "Maçã", "Pão", "Queijo", "Fiambre", "Massa", "Ovo"],
            "games": ["Minecraft", "Roblox", "Fortnite", "Mario", "Zelda", "Sonic", "GTA", "Tetris", "FIFA", "Pac-Man", "Free-Fire", "Efootball"],
            "brands": ["Nike", "Apple", "Adidas", "Samsung", "Coca-Cola", "IKEA", "Nespresso", "Zara", "Continente", "Disney", "Xiaomi"],
            "movies": ["Avatar", "Titanic", "Shrek", "Star Wars", "Harry Potter", "Joker", "Vingadores", "Rei Leão", "Toy Story", "Batman"],
            "series": ["Stranger Things", "La Casa de Papel", "The Crown", "Friends", "Breaking Bad", "The Office", "Dark", "Elite", "The Witcher", "Squid Game"],
            "objects": ["Telefone", "Chave", "Relógio", "Óculos", "Caneta", "Carteira", "Candeeiro", "Espelho", "Cadeira", "Garrafa", "Computador", "Televisão", "Comando", "Martelo", "Tesoura", "Faca", "Colher", "Garfo", "Prato", "Copo", "Panela", "Almofada", "Cama", "Mesa", "Sofá", "Mochila", "Guarda-chuva", "Escova de dentes", "Pente", "Toalha", "Sabonete", "Perfume", "Caderno", "Livro", "Borracha", "Lápis", "Tesoura", "Isqueiro", "Lanterna", "Pilha", "Aspirador", "Vassoura", "Balde", "Mala de viagem", "Quadro", "Tapete", "Cortina", "Ventilador", "Sapato", "Chapéu"],
            "bible": [
            //personagens
            "Jesus", "Maria", "Moisés", "Davi", "Golias", "Noé", "Adão", 
            "Eva", "Sansão", "Dalila", "Abraão", "Salomão", "Pedro", "Daniel", 
            "Paulo", "Judas", "João Batista",
            // LUGARES
            "Jerusalém", "Egito", "Mar Vermelho", "Rio Jordão", "Belém", 
            "Nazaré", "Jardim do Éden", "Monte Sinai", "Jericó", "Babilônia"]
        },

        "en": 
        {
            "anime": ["Naruto", "Dragon Ball", "One Piece", "Pokémon", "Death Note", "Attack on Titan", "Demon Slayer", "Fullmetal Alchemist", "Jujutsu Kaisen", "One Punch Man"],
            "characters": ["Naruto", "Goku", "Luffy", "Vegeta", "Pikachu", "Tanjiro", "Sasuke", "Zoro", "Saitama", "Ash Ketchum"],
            "animals": ["Dog", "Cat", "Lion", "Elephant", "Giraffe", "Horse", "Shark", "Eagle", "Dolphin", "Rabbit", "Tiger", "Bear", "Zebra", "Monkey", "Snake", "Alligator", "Whale", "Penguin", "Wolf", "Fox", "Kangaroo", "Hippopotamus", "Rhinoceros", "Cow", "Pig", "Sheep", "Chicken", "Duck", "Mouse", "Squirrel", "Bat", "Turtle", "Octopus", "Crab", "Ant", "Bee", "Butterfly", "Spider", "Scorpion", "Frog", "Chameleon", "Parrot", "Owl", "Peacock", "Ostrich", "Panda", "Koala", "Panther", "Hyena", "Cheetah"],
            "soccer": ["Cristiano Ronaldo", "Lionel Messi", "Neymar", "Kylian Mbappé", "Erling Haaland", "Kevin De Bruyne", "Robert Lewandowski", "Mohamed Salah", "Vinícius Júnior", "Jude Bellingham", "Pelé", "Diego Maradona", "Zinedine Zidane", "Ronaldinho", "Ronaldo", "Johan Cruyff", "Eusébio", "Luís Figo", "David Beckham", "Zico", "Pepe", "Bernardo Silva", "Bruno Fernandes", "Luka Modric", "Karim Benzema", "Manuel Neuer", "Thierry Henry", "Zlatan Ibrahimovic", "Roberto Carlos", "Cafu", "Real Madrid", "FC Barcelona", "Manchester City", "Manchester United", "Liverpool", "Arsenal", "Chelsea", "Bayern Munich", "Borussia Dortmund", "Paris Saint-Germain", "Juventus", "Inter Milan", "AC Milan", "Benfica", "FC Porto", "Sporting CP", "Flamengo", "Palmeiras", "River Plate", "Boca Juniors", "Ajax", "Napoli", "Atlético de Madrid", "Bayer Leverkusen", "Tottenham", "Al-Nassr", "Inter Miami", "Pep Guardiola", "José Mourinho", "Carlo Ancelotti"],
            "clash-royale": ["Giant", "Wizard", "P.E.K.K.A", "The Log", "Miner", "Prince", "Barbarians", "Skeletons", "Goblins", "Hog Rider", "Sparky"],
            "countries": ["Portugal", "Spain", "France", "Italy", "Brazil", "Angola", "England", "Germany", "Japan", "USA", "Cape Verde", "Egypt", "Iran", "Israel"],
            "food": ["Codfish", "Rice", "Pizza", "Hamburger", "Apple", "Bread", "Cheese", "Ham", "Pasta", "Egg"],
            "games": ["Minecraft", "Roblox", "Fortnite", "Mario", "Zelda", "Sonic", "GTA", "Tetris", "FIFA", "Pac-Man", "Free-Fire", "Efootball"],
            "brands": ["Nike", "Apple", "Adidas", "Samsung", "Coca-Cola", "IKEA", "Nespresso", "Zara", "Continente", "Disney", "Xiaomi"],
            "movies": ["Avatar", "Titanic", "Shrek", "Star Wars", "Harry Potter", "Joker", "Avengers", "The Lion King", "Toy Story", "Batman"],
            "series": ["Stranger Things", "Money Heist", "The Crown", "Friends", "Breaking Bad", "The Office", "Dark", "Elite", "The Witcher", "Squid Game"],
            "objects": ["Phone", "Key", "Watch", "Glasses", "Pen", "Wallet", "Lamp", "Mirror", "Chair", "Bottle", "Computer", "Television", "Remote Control", "Hammer", "Scissors", "Knife", "Spoon", "Fork", "Plate", "Glass", "Pot", "Pillow", "Bed", "Table", "Sofa", "Backpack", "Umbrella", "Toothbrush", "Comb", "Towel", "Soap", "Perfume", "Notebook", "Book", "Eraser", "Pencil", "Scissors", "Lighter", "Flashlight", "Battery", "Vacuum Cleaner", "Broom", "Bucket", "Suitcase", "Painting", "Rug", "Curtain", "Fan", "Shoe", "Hat"],
            "bible": [
            // CHARACTERS
            "Jesus", "Moses", "David", "Goliath", "Noah", "Adam", 
            "Eve", "Samson", "Delilah", "Abraham", "Solomon", "Peter", 
            "Paul", "Judas", "John the Baptist", "Daniel",
            // PLACES
            "Jerusalem", "Egypt", "Red Sea", "Jordan River", "Bethlehem", 
            "Nazareth", "Garden of Eden", "Mount Sinai", "Jericho", "Babylon"]
        }
    };

    const i18n = 
    {
        'pt': 
        {
            subtitle: "Descubra quem é o impostor",
            label_name: "NOME:",
            placeholder_name: "Digite um nome",
            label_lang: "IDIOMA:",
            btn_join: "JOGAR",
            btn_browse_rooms: "VER SALAS",
            room_title: "SALAS",
            room_lang_title: "Idioma:",
            theme_title: "Tema:",  
            loading_rooms: "Carregando as salas...",
            empty_table: "Nenhuma sala disponível",
            btn_new_room: "NOVA SALA",
            modal_join_room_title: "ENTRAR NA SALA",
            modal_join_room_code: "Digite o código da sala",
            modal_btn_join_room: "ENTRAR",  
            modal_new_room_title: "CRIAR NOVA SALA",
            modal_new_room_label_max_player: "MÁX. JOGADORES:",
            modal_new_room_label_lang: "IDIOMA DA SALA",
            modal_new_room_label_theme: "TEMA DO JOGO",  
            modal_new_room_label_visib: "VISIBILIDADE DA SALA",
            private_label: '<i class="bi bi-lock-fill me-2"></i>' + "PRIVADA",
            public_label: '<i class="bi bi-globe2 me-2"></i>' + "PÚBLICA",
            modal_new_room_info_visib: "Salas privadas não aparecem na lista global",
            modal_new_room_create: "CRIAR AGORA",
            modal_save_time_title: "USAR POUPA-TEMPO?",
            modal_save_time_subtitle: "Finaliza a rodada e abre a votação agora.",
            modal_save_time_btn: "POUPA-TEMPO",
            _4player_label: "4 Jogadores",
            _5player_label: "5 Jogadores",
            _6player_label: "6 Jogadores",
            _7player_label: "7 Jogadores",
            _8player_label: "8 Jogadores",
            _9player_label: "9 Jogadores",
            _10player_label: "10 Jogadores",
            filter_general: "Geral",
            theme_option: "Escolha um tema",
            theme_characters: "Personagens",
            theme_food: "Alimentos",
            theme_animals: "Animais",
            theme_animes: "Animes",
            theme_clash: "Clash Royale",
            theme_movies: "Filmes",
            theme_soccer: "Futebol",
            theme_games: "Games",
            theme_players: "Jogadores",
            theme_brands: "Marcas",
            theme_objects: "Objetos",
            theme_countries: "Países",
            theme_series: "Séries de TV",
            theme_bible: "Bíblia",
            lobby_title: "SALA CRIADA",
            lobby_code: "CÓDIGO " + '<span id="lobby-room-code" class="text-warning"></span>',
            lobby_leave_room: "SAIR DA SALA",
            modal_leave_room_title: "SAIR DA SALA?",
            modal_leave_room_subtitle: "Se saíres agora, perderás o teu progresso nesta partida.",
            modal_leave_room_btn_confirm: "SIM, SAIR",
            modal_leave_room_btn_cancel: "CANCELAR",
            game_started_tip: "O jogo começou! Dê uma pista.",
            game_label_round: "RODADA",
            input_placeholder_tip: "Escreve a tua pista...",
            game_word_title: "A PALAVRA É:",
            game_save_time_title: "POUPA-TEMPO: " + '<span id="save-time-desc" class="fw-bold text-success mb-0"></span>',
            game_btn_send_title: "ENVIAR",
            game_secret_word: "VOCÊ É O IMPOSTOR!",
            voting_label_title: "QUEM É O IMPOSTOR?",
            btn_vote_action: "Votar",
            btn_vote_done: "Votado",
            result_win_players_title: "VITÓRIA DOS JOGADORES!",
            result_win_players_desc: "O grupo suspeitou de {{name}} e acertou em cheio!",
            result_win_impostor_title: "VITÓRIA DO IMPOSTOR!",
            result_win_impostor_desc: "O grupo votou em {{voted}}, mas o impostor era {{impostor}}.",
            result_label_title: "O IMPOSTOR ERA:",
            result_secret_word_title: "A PALAVRA SECRETA ERA:",
            result_btn_play: "JOGAR NOVAMENTE",
            result_info_play: '<div class="spinner-border spinner-border-sm me-2" role="status"></div>' + 
                                "Aguardando o Host reiniciar a sala...",
            alert_host_closed: "O host encerrou a partida ou a sala foi fechada.",
            alert_end_clues: "Fim das pistas! Hora de votar no Impostor.",
            alert_room_not_found: "Essa sala não existe! Verifique o código.",
            alert_game_started: "Jogo iniciado com sucesso!",
            alert_game_start_error: "Erro ao iniciar a partida.",
            alert_vote_success: "Voto registado! Aguardando os outros...",
            alert_vote_retry: "Vota novamente, erro ao votar.",
            alert_generic_error: "Erro, tenta novamente.",
            alert_save_time_success: "Poupa-tempo registado!",
            alert_process_vote_error: "Erro ao processar voto.",
            alert_select_theme: "Escolha um tema.",
            alert_code_length: "O código deve ter 5 caracteres!",
            info_social_net: "Redes Sociais",
            info_sugestion_title: "Dúvidas ou sugestões?",
            info_contact_title: "Fale Conosco",
            intruction_title: "Como Jogar",
            intruction_prep: "Preparação",
            intruction_round: "Rodadas",
            intruction_obj: "Objetivo",
            intruction_iobj: "Objetivo do Impostor",
            intruction_vote: "Pular para a Votação",
            intruction_verdict: "Veredito",

            intruction_prep_p: "Uma sala é criada com um Tema específico. Quando a partida começa " +
                                "3 jogadores recebem a Palavra Secreta, enquanto o Impostor vê apenas o Tema",

            intruction_round_p: "O jogo dura 3 rodadas, " + 
                              "em cada rodada os jogadores devem digitar uma única palavra relacionada à Palavra Secreta",

            intruction_obj_p: "Seja claro o suficiente para que seus aliados saibam que você é confiável, " +
                            "mas vago o bastante para que o Impostor não consiga adivinhar a palavra",
                            
            intruction_iobj_p: "Tente se misturar! Use o Tema exibido no canto superior esquerdo " +
                             "para fingir que sabe a palavra e passar pelas rodadas",
                             
            intruction_vote_p: "Viu alguém agindo de forma suspeita ou dizendo algo totalmente fora do tema? " +
                             "Use o botão 'Poupa-Tempo' para ir direto para a fase de votação",

            intruction_verdict_p: "Após 3 rodadas compare as respostas. " +
                                " Analise quem foi inconsistente e vote para eliminar o Impostor",
        },

        'en': 
        {
            subtitle: "Find the impostor",
            label_name: "NICKNAME:",
            placeholder_name: "Enter your nickname",
            label_lang: "LANGUAGE:",
            btn_join: "PLAY",
            btn_browse_rooms: "BROWSE ROOMS",
            room_title: "ROOMS",
            room_lang_title: "Language:",
            theme_title: "Theme:",
            loading_rooms: "Loading rooms...",
            empty_table: "No rooms available",
            btn_new_room: "NEW ROOM",
            modal_join_room_title: "JOIN ROOM",
            modal_join_room_code: "Enter room code",
            modal_btn_join_room: "JOIN",
            modal_new_room_title: "CREATE NEW ROOM",
            modal_new_room_label_max_player: "MAX. PLAYERS:",
            modal_new_room_label_theme: "THEME:",
            modal_new_room_label_visib: "ROOM VISIBILITY:",
            private_label: '<i class="bi bi-lock-fill me-2"></i>' + "PRIVATE",
            public_label: '<i class="bi bi-globe2 me-2"></i>' + "PUBLIC",
            modal_new_room_info_visib: "Private rooms don't appear in the global list",
            modal_new_room_create: "CREATE NOW",
            modal_save_time_title:"USE SKIP VOTE?",
            modal_save_time_subtitle: "Ends the round and starts the voting now.",
            modal_save_time_btn: "SKIP VOTE",
            _4player_label: "4 Players",
            _5player_label: "5 Players",
            _6player_label: "6 Players",
            _7player_label: "7 Players",
            _8player_label: "8 Players",
            _9player_label: "9 Players",
            _10player_label: "10 Players",
            filter_general: "General",
            theme_option: "Select a theme",
            theme_characters: "Characters",
            theme_food: "Food",
            theme_animals: "Animals",
            theme_animes: "Anime",
            theme_clash: "Clash Royale",
            theme_movies: "Movies",
            theme_soccer: "Soccer",
            theme_games: "Video Games",
            theme_players: "Famous Players",
            theme_brands: "Brands",
            theme_objects: "Objects",
            theme_countries: "Countries",
            theme_series: "TV Shows",
            theme_bible: "Bible",
            lobby_title: "ROOM CREATED",
            lobby_code: "CODE: " + '<span id="lobby-room-code" class="text-warning"></span>',
            lobby_leave_room: "QUIT",
            modal_leave_room_title: "LEAVE ROOM?",
            modal_leave_room_subtitle: "If you leave now, you will lose your progress in this match.",
            modal_leave_room_btn_confirm: "YES, LEAVE",
            modal_leave_room_btn_cancel: "CANCEL",
            game_started_tip: "The game has started! Give a clue.",
            game_label_round: "ROUND",
            input_placeholder_tip: "Type your clue...",
            game_word_title: "THE WORD IS:",
            game_save_time_title: "SKIP VOTE: " + '<span id="save-time-desc" class="fw-bold text-success mb-0"></span>',
            game_btn_send_title: "SEND",
            game_secret_word: "YOU ARE THE IMPOSTOR!",
            voting_label_title: "WHO IS THE IMPOSTOR?",
            btn_vote_action: "Vote",
            btn_vote_done: "Voted", 
            result_win_players_title: "PLAYERS WIN!",
            result_win_players_desc: "The group suspected {{name}} and was spot on!",
            result_win_impostor_title: "IMPOSTOR WINS!",
            result_win_impostor_desc: "The group voted for {{voted}}, but the impostor was {{impostor}}.",
            result_label_title: "THE IMPOSTOR WAS:",
            result_secret_word_title: "THE SECRET WORD WAS:",
            result_btn_play: "PLAY AGAIN",
            result_info_play: '<div class="spinner-border spinner-border-sm me-2" role="status"></div>' + 
                                "Waiting for Host to restart the room...",
            alert_host_closed: "The host ended the match or the room was closed.",
            alert_end_clues: "No more clues! Time to vote for the Impostor.",
            alert_room_not_found: "This room doesn't exist! Check the code.",
            alert_game_started: "Game started successfully!",
            alert_game_start_error: "Error starting the match.",
            alert_vote_success: "Vote recorded! Waiting for others...",
            alert_vote_retry: "Vote again, error during voting.",
            alert_generic_error: "Error, please try again.",
            alert_save_time_success: "Skip Vote recorded!",
            alert_process_vote_error: "Error processing vote.",
            alert_select_theme: "Please select a theme.",
            alert_code_length: "The code must be 5 characters long!",
            info_social_net: "Social Media",
            info_sugestion_title: "Questions or suggestions?",
            info_contact_title: "Contact Us",
            intruction_title: "How to Play",
            intruction_prep: "The Setup",
            intruction_round: "The Rounds",
            intruction_obj: "The Goal",
            intruction_iobj: "The Impostor's Goal",
            intruction_vote: "Skip to Vote",
            intruction_verdict: "The Verdict",

            intruction_prep_p: "A room is created with a specific Theme. " + 
                                "When the match starts 3 players receive the Secret Word, while the Impostor only sees the Theme",

            intruction_round_p: "The game lasts for 3 rounds. " +
                                "In each round, players must type a single word related to the Secret Word",

            intruction_obj_p: "Be clear enough so allies know you're safe, but vague enough so the Impostor can't guess the word",
                            
            intruction_iobj_p: "Try to blend in! Use the Theme in the top-left corner to fake your way through the rounds",
                             
            intruction_vote_p: "See someone acting suspicious or saying something completely off-theme? " +
                               "Use the 'Time-Saver' button to jump straight to the voting phase",

            intruction_verdict_p: "After 3 rounds compare the answers. Analyze who was inconsistent and vote to eliminate the Impostor",
        }
    };

    /*setTimeout(() => 
    {
        showSection('home')
    }, 2000);*/

    
// ******************************************************** FUNCTIONS ************************************************************
    window.setLanguage = function (lang) 
    {
        if (!lang) return;
    
        currentLang = lang;
        localStorage.setItem('selectedLang', lang);
        $('#new-room-lang').val(lang);
        $('#lang_filter').val(lang);

        if(!(lang in i18n))
        {
            showFloatingAlert("Coming soon!", "warning");
            window.setLanguage('en');
            return;
        }

        $('[data-i18n]').each(function() 
        {
            const key = $(this).attr('data-i18n');
            const translation = i18n[lang][key];
            if (translation) 
            {
                if ($(this).is('input')) 
                {
                    $(this).attr('placeholder', translation);
                } 
                else 
                {
                    $(this).html(translation);
                }
            }
        });

        $('#player-language').val(lang);
    }

    window.setLanguage(currentLang);

    function statusRoomList() 
    {
        const roomsRef = window.fbRef(window.fbDB, 'rooms');

        window.fbOnValue(roomsRef, (snapshot) => 
        {
            lastRoomData = snapshot.val();
            listenToRoomList();
        });
    }

    statusRoomList()

    function generatePlayerName() 
    {
        let name = "";
        name = "Player_" + Math.floor(Math.random() * 999);
        return name;
    }   

    function showFloatingAlert(message, type) 
    {
        const toastElement = document.getElementById('liveToast');
        const toastMessage = document.getElementById('toast-message');
        let text_color = 'text-white';

        if(type == "warning")
        {
            text_color = 'text-dark';
        }

        toastMessage.textContent = message;

        toastElement.className = `toast align-items-center ${text_color} bg-${type} border-0 shadow-lg`;

        const toast = new bootstrap.Toast(toastElement, 
        {
            delay: 4000,
            autohide: true
        });
        toast.show();
    }

    function showSection(sectionId) 
    {
        $('section').addClass('d-none').removeClass('d-flex').hide();

        const $target = $(`#${sectionId}`);
        
        if ($target.length) 
        {
            $target.removeClass('d-none')
                .addClass('d-flex')
                .hide()
                .fadeIn(20);
        } else 
        {
            //console.error(`Seção #${sectionId} não encontrada!`);
        }
    }

    function startTimer(duration) 
    {
        let timer = duration;
        const display = $('#game-timer');
        const roundDisplay = $('#game-round-display');
        
        roundDisplay.text(`${currentRound} / ${totalRounds}`);

        roundDisplay.text(`${currentRound} / ${totalRounds}`);
        display.removeClass('text-danger border-danger');

        clearInterval(gameInterval);

        gameInterval = setInterval(function () 
        {
            display.text(timer);

            if (timer <= 10) 
                {
                display.addClass('text-danger border-danger');
            }

            if (--timer < 0) 
            {
                clearInterval(gameInterval);

                if (window.isHost) 
                {
                    const roomId = $('#lobby-room-code').text().trim();
                    updateToNextRound(roomId, currentRound);
                }
            }
        }, 1000);
    }

    function goToVoting(roomId)
    {
        const playersRef = window.fbRef(window.fbDB, `rooms/${roomId}/players`);

        window.fbGet(playersRef).then((snapshot) => 
        {
            const players = snapshot.val() || {};
            const $list = $('#voting-list');
            $list.empty();

            Object.keys(players).forEach((id) => 
            {

                if (id !== window.myLocalId) 
                {
                    const playerName = players[id].name;

                    const isMyVote = (id === myVoteId);

                    const disabledAttr = hasVoted ? 'disabled' : '';
                    const opacityClass = hasVoted ? (isMyVote ? '' : 'opacity-50') : '';

                    const translatedBtnAction = i18n[currentLang]['btn_vote_action'];
                    const translatedBtnDone = i18n[currentLang]['btn_vote_done'];
                    
                    const borderStyles = isMyVote ? 
                    `border: 4px solid #ffc107 !important; position: relative; z-index: 10;` : '';

                    const btnHtml = `
                        <button class="list-group-item list-group-item-action fw-bold d-flex 
                                justify-content-between 
                                align-items-center
                                ${opacityClass}" 
                                style="${borderStyles}"
                                ${disabledAttr}
                                onclick="castVote('${roomId}', '${id}', event)">${playerName}
                            <span class="badge ${isMyVote ? 'bg-warning text-dark' : 'bg-success'} rounded-pill">
                            ${isMyVote ? translatedBtnDone : translatedBtnAction}
                        </span>
                        </button>`;

                    $list.append(btnHtml);
                }
            });

            if ($('#game-voting').hasClass('d-none')) 
            {
                $('#game-voting').removeClass('d-none').hide().fadeIn(300);
                showFloatingAlert(i18n[currentLang].alert_end_clues, "info");
            }
        });
    }

    function listenToPlayers(roomId) 
    {
        const roomRef = window.fbRef(window.fbDB, `rooms/${roomId}`);

        window.fbOnValue(roomRef, (snapshot) => 
        {
            const roomData = snapshot.val();

            if (!roomData) 
            {
                clearInterval(gameInterval);

                showFloatingAlert(i18n[currentLang].alert_host_closed, "danger");

                window.myLocalId = null;
                showSection('home');
                $("#home-btn-play").prop('disabled', false);

                window.fbOff(roomRef);
                return; 
            }

            if (roomData) 
            {
                const players = roomData.players || {};
                const maxPlayers = roomData.config.maxPlayers;

                const listElement = $('#player-list');
                listElement.empty();

                const playerKeys = Object.keys(players);
                const numPlayers = playerKeys.length;

                let lobby_self_label = " (você)";

                if (currentLang == 'en')
                {
                    lobby_self_label = " (you)";
                }

                playerKeys.forEach((key) => 
                {
                    const p = players[key];
                    const isMe = (key === window.myLocalId) ? "<span class='bg-light text-dark fw-bold'>"+lobby_self_label+"</span>" : "";
                    const isHost = p.isHost ? " (host)" : "";
                    const color = p.isHost ? "bg-warning" : "bg-info";

                    listElement.append(`
                        <div class="d-flex align-items-center p-2 mb-2 border-bottom text-dark">
                            <div class="rounded-circle ${color} me-3" 
                                style="width: 40px; height: 40px; display:flex; align-items:center;
                                justify-content:center; font-weight:bold;">
                                ${p.name.charAt(0).toUpperCase()}
                            </div>
                            <span class="fw-bold">${p.name}${isMe}${isHost}</span>
                        </div>
                    `);
                });

                listElement.scrollTop(listElement[0].scrollHeight);

                let lobby_waiting_start = "Aguardando o host iniciar...";
                const $btn = $('#lobby-btn-start');

                if (window.myLocalId === "p1") 
                {
                    let lobby_btn_start = (currentLang == 'en') ? "START GAME" : "COMEÇAR JOGO";
                    let lobby_waiting_players = (currentLang == 'en') ? "WAITING FOR PLAYERS" : "AGUARDANDO JOGADORES";
                    
                    if (numPlayers >= 4) 
                    {
                        $btn.prop('disabled', false)
                            .removeClass('btn-secondary')
                            .addClass('btn-warning')
                            .text(lobby_btn_start);
                    }
                    else 
                    {
                        $btn.prop('disabled', true)
                            .removeClass('btn-warning')
                            .addClass('btn-secondary')
                            .text(`${lobby_waiting_players} (${numPlayers}/${maxPlayers})`);
                    }

                    $btn.show();
                }
                else 
                {
                    $btn.hide();

                    if (currentLang == 'en') { lobby_waiting_start = "Waiting for the host to start..."; }

                    if ($('#waiting-msg').length === 0) 
                    {
                        $('#player-list').after('<p id="waiting-msg" class="text-center text-muted small mt-2">'
                                                +lobby_waiting_start+
                                                '</p>');
                    }
                }
            }
        });
    }

    function listenToStatus(roomId) 
    {
        const roomRef = window.fbRef(window.fbDB, `rooms/${roomId}`);
        
        window.fbOnValue(roomRef, (snapshot) => 
        {
            const data = snapshot.val();

            if (!data) return;

            if (data.status === "voting") 
            {
                clearInterval(gameInterval);

                const roundsRef = window.fbRef(window.fbDB, `rooms/${roomId}/rounds`);
                window.fbOff(roundsRef); 
                
                $('#game-chat').hide();
                $('#save-time-desc').closest('.bg-white').hide()
                $('#tips-container').css("margin-bottom","0%")
                goToVoting(roomId);
            }

            if (data.status === "results")
            {
                window.fbOff(window.fbRef(window.fbDB, `rooms/${roomId}/votes`));
                showFinalResults(data.result, roomId);
                $('#btn-back-lobby').attr('data-room', roomId);
            }

            if (data.status === "waiting") 
            {
                showSection('lobby');              

                hasVoted = false;
                myVoteId = null;

                window.processingResults = false;
                window.isListeningTips = false;
                currentRound = 1; 
                
                $('#col-round-1, #col-round-2, #col-round-3').empty();
                $('#game-input-tip, #game-btn-send').prop('disabled', false);
            }

            if (data && data.status === "playing") 
            {
                if ($('#game').hasClass('d-none')) 
                { 
                    showSection('game');
                    $('#game-topic').text(data.config.themeDesc);
                    startTimer(60);
                }

                $('#game-card, #tips-container, #game-chat').removeClass('d-none').show(); 
                $('#game-results, #game-voting').addClass('d-none').hide();
                
                if (window.myLocalId === data.secret.fake) 
                {
                    const translatedSecret = i18n[currentLang]['game_secret_word'];

                    $('#desc-word').hide();
                    $('#secret-word').text(translatedSecret);
                } 
                else 
                {
                    $('#desc-word').show();
                    $('#secret-word').text((data.secret.word).toUpperCase());
                }

                if (currentRound === 1) 
                {
                    checkRoundCompletion(roomId, 1);
                }

                if (!window.isListeningTips) 
                {
                    listeningTips(roomId);
                    window.isListeningTips = true;
                }

                const players = data.players || {};
                const totalPlayers = Object.keys(players).length;
                const currentVotes = data.skipVotes || {};
                
                const voteCount = Object.keys(currentVotes).length;
                const neededVotes = Math.floor(totalPlayers / 2) + 1;

                const isPoupaTempo = data.skipVotes && data.skipVotes[window.myLocalId];

                $('#save-time-desc').text(`${voteCount}/${neededVotes}`);

                if (voteCount > 0) { $('#save-time-desc').closest('.bg-white').show() } 
                else {$('#save-time-desc').closest('.bg-white').hide()}

                if (isPoupaTempo) { $('#btn-save-time').prop('disabled', true).addClass('opacity-50') } 
                else { $('#btn-save-time').prop('disabled', false).removeClass('opacity-50') }
            }

            if (data.currentRound && data.currentRound !== currentRound) 
            {
                currentRound = data.currentRound;
                $('#game-input-tip').val("");
                $('#game-input-tip, #game-btn-send').prop('disabled', false);

                startTimer(60);
                checkRoundCompletion(roomId, currentRound);
            }
        });
    }

    function createRoom(name, visibility, maxPlayers, language, themeDesc, theme, l) 
    {
        const roomId = Math.random().toString(36).substring(2, 7).toUpperCase();
        const roomRef = window.fbRef(window.fbDB, 'rooms/' + roomId);
        
        const data = 
        {
            status: "waiting",
            visibility: visibility,
            config: 
            {
                themeDesc: themeDesc,
                theme: theme,
                language: language, 
                maxPlayers: parseInt(maxPlayers),
                round: 1,
                timer: 60
            },
            players: 
            { 
                "p1": { name: name, isHost: true, points: 0 } 
            }
        };

        window.myLocalId = "p1";
        window.myLocalName = name;
        window.isHost = true;

        window.fbSet(roomRef, data).then(() => 
        {
            window.fbDisconnect(roomRef).remove();

            $('#lobby-room-code').text(roomId);
            showSection('lobby');

            listenToPlayers(roomId, maxPlayers);
            listenToStatus(roomId);

            l.stop();
        });
    }

    /*window.joinRoom = function (roomId, name) 
    {
        if (name === "") 
        {
            name = "Player_" + Math.floor(Math.random() * 999);
        }

        const tryJoin = (playerNum) => 
        {
            const myId = 'p' + playerNum;
            const playerRef = window.fbRef(window.fbDB, `rooms/${roomId}/players/${myId}`);

            window.fbGet(playerRef).then((snapshot) => 
            {
                if (snapshot.exists()) 
                {
                    tryJoin(playerNum + 1);
                } 
                else 
                {
                    window.fbSet(playerRef, 
                    {
                        name: name,
                        isHost: false,
                        points: 0
                    }).then(() => 
                    {
                        window.myLocalId = myId;
                        window.myLocalName = name;
                        window.isHost = false;

                        $('#lobby-room-code').text(roomId);
                        showSection('lobby');
                        listenToPlayers(roomId);
                        listenToStatus(roomId);
                    }).catch((err) => 
                    {
                        tryJoin(playerNum + 1);
                    });
                }
            });
        };

        tryJoin(2);
    }*/

    window.joinRoom = function (roomId, name) 
    {
        if (window.joining) return;
        window.joining = true;

        if (!name) name = "Player_" + Math.floor(Math.random() * 999);

        let maxPlayers = window.fbRef(window.fbDB, `rooms/${roomId}/maxPlayers`);

        const tryJoin = (playerNum) => 
        {
            if (playerNum > maxPlayers) 
            { 
                alert("Sala cheia"); 
                window.joining = false;
                return; 
            }

            const myId = 'p' + playerNum;
            const playerRef = window.fbRef(window.fbDB, `rooms/${roomId}/players/${myId}`);

            window.fbTransaction(playerRef, (current) => 
            {
                if (current !== null) return;
                return { name: name, isHost: false, points: 0 };
            })
            .then((result) => 
            {
                if (!result.committed) 
                {
                    tryJoin(playerNum + 1);
                    return;
                }
                window.fbDisconnect(playerRef).remove();

                window.myLocalId = myId;
                window.myLocalName = name;
                window.isHost = false;
                $('#lobby-room-code').text(roomId);
                showSection('lobby');
                listenToPlayers(roomId);
                listenToStatus(roomId);
            }).catch((err) => 
            {
                //console.error(err);
                alert("Erro ao entrar na sala");
                window.joining = false;
            });
        };

        tryJoin(2);
    };

    function listenToRoomList() 
    {
        const tableBody = $('#rooms-table');
        const selectedLang = $('#lang_filter').val() || 'all';
        const selectedTheme = $('#theme_filter').val() || 'all';

        const messages = 
        {
            pt: 
            {
                none: "Nenhuma sala disponível. Crie uma!",
                filtered: "Nenhuma sala encontrada com esses filtros."
            },
            en: 
            {
                none: "No rooms available. Create one!",
                filtered: "No rooms found with these filters."
            }
        };

        const msg = messages[currentLang] || messages.pt;

        if (!lastRoomData) 
        {
            $('#room-loading').addClass('d-none');
            tableBody.empty().append(`<p class="text-center text-muted">${msg.none}</p>`);
            return;
        }

        tableBody.empty();
        let roomsFound = 0;

        Object.keys(lastRoomData).forEach(id => 
        {
            const r = lastRoomData[id];

            if (!r.config || !r.players) return;
            if (r.visibility !== "public" || r.status !== "waiting") return;

            const matchLang = (selectedLang === 'all' || r.config.language === selectedLang);
            const matchTheme = (selectedTheme === 'all' || r.config.theme === selectedTheme);

            if (matchLang && matchTheme) 
            {
                roomsFound++;
                const numPlayers = Object.keys(r.players).length;
                const maxPlayers = r.config.maxPlayers;
                const theme = r.config.theme;

                const themeDesc = i18n[currentLang][`theme_${theme}`] || r.config.themeDesc;
                const isFull = numPlayers >= maxPlayers;

                tableBody.append(`
                    <button
                        ${isFull ? '' : `onclick="joinRoom('${id}', $('#player-nickname').val())"`}
                        class="d-flex justify-content-between align-items-center w-100 text-start p-3 mb-2 bg-white rounded border text-decoration-none text-dark room-item shadow-sm">
                        
                        <div class="d-flex flex-column">
                            <h5 class="mb-0 fw-bold text-uppercase" style="letter-spacing: 1px;">
                                ${themeDesc}
                            </h5>
                            <small class="text-muted">Código: ${id} | ${r.config.language.toUpperCase()}</small>
                        </div>

                        <div class="infoRoom d-flex align-items-center">
                            <span class="badge ${isFull ? 'bg-danger' : 'bg-success'} rounded-pill me-2">
                                ${numPlayers} / ${maxPlayers}
                            </span>
                            <i class="bi bi-chevron-right text-secondary"></i>
                        </div>
                    </button>
                `);
            }
        });

        $('#room-loading').addClass('d-none');

        if (roomsFound === 0) 
        {
            tableBody.append(`<p class="text-center text-muted">${msg.filtered}</p>`);
        }
    }

    function leaveRoom(roomId) 
    {
        const myId = window.myLocalId;
        const playerRef = window.fbRef(window.fbDB, `rooms/${roomId}/players/${myId}`);

        window.fbRemove(playerRef).then(() => 
        {
            window.myLocalId = null;
            window.joining = false;
            window.fbOff(window.fbRef(window.fbDB, `rooms/${roomId}`));

            showSection('home');
        });
    }

    window.quickMatch = function (l) 
    {
        let name = $('#player-nickname').val().trim();
        const selectedLang = $('#player-language').val();    

        if (name === "") 
        {
            name = generatePlayerName();
            $('#player-nickname').val(name);
        }

        const roomsRef = window.fbRef(window.fbDB, 'rooms');

        window.fbGet(roomsRef).then((snapshot) => 
        {
            const allRooms = snapshot.val();
            let foundRoomId = null;

            if (allRooms) 
            {
                foundRoomId = Object.keys(allRooms).find(id => 
                {
                    const r = allRooms[id];
                    const numPlayers = Object.keys(r.players || {}).length;
                    const maxPlayers = r.config.maxPlayers || 4;

                    return r.status === "waiting" &&
                        r.visibility === "public" &&
                        r.config.language === selectedLang &&
                        numPlayers < maxPlayers;
                });
            }

            if (foundRoomId) 
            {
                joinRoom(foundRoomId, name);
                l.stop();
            } 
            else 
            {
                const availableThemes = Object.keys(words[selectedLang]);
                const randomTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)]; 
                const translatedTheme = i18n[selectedLang]['theme_' + randomTheme];
                let randomThemeDesc = translatedTheme.charAt(0).toUpperCase() + translatedTheme.slice(1);
                
                createRoom(name, "public", 4, selectedLang, randomThemeDesc, randomTheme, l);
            }
        }).catch((error) => 
        {
            l.stop();
            $(this).prop('disabled', false);
            //console.error("Erro no Quick Match:", error);
        });
    };

    async function startGame(l) 
    {
        const roomId = $('#lobby-room-code').text();
        const roomRef = window.fbRef(window.fbDB, `rooms/${roomId}`);

        try 
        {
            const snapshot = await window.fbGet(roomRef);
            const roomData = snapshot.val();
            
            if (!roomData || !roomData.players) return;

            const playersIds = Object.keys(roomData.players);
            const theme = roomData.config.theme;

            const fakeId = playersIds[Math.floor(Math.random() * playersIds.length)];

            let list = words[roomData.config.language][theme];

            if (!list) 
            {
                const availableThemes = Object.keys(words[roomData.config.language]);
                const randomTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)];
                list = words[roomData.config.language][randomTheme];
            }

            const wordDrawn = list[Math.floor(Math.random() * list.length)];

            await window.fbUpdate(roomRef, 
            {
                status: "playing",
                currentRound: 1,
                secret: { word: wordDrawn, fake: fakeId }
            });
            
            showFloatingAlert(i18n[currentLang].alert_game_started, "info");

        } 
        catch (error) 
        {
            showFloatingAlert(i18n[currentLang].alert_game_start_error, "danger");
        }

        l.stop();
    }

    function listeningTips(roomId) 
    {
        const roundsRef = window.fbRef(window.fbDB, `rooms/${roomId}/rounds`);

        window.fbOff(roundsRef); 

        window.fbOnValue(roundsRef, (snapshot) => 
        {
            const roundsData = snapshot.val();
            if (!roundsData) return;

            $('#col-round-1, #col-round-2, #col-round-3').empty();

            let isAlreadySentTipThisRound = false;

            Object.keys(roundsData).forEach(roundKey => 
            {
                const roundNum = roundKey.split('_')[1].trim();
                const playersTips = roundsData[roundKey];
                
                if (roundNum == currentRound && playersTips[window.myLocalId]) 
                {
                    isAlreadySentTipThisRound = true;
                }

                Object.values(playersTips).forEach(tip => 
                {
                    const itemHtml = `
                        <div class="bg-white rounded p-1 shadow-sm mb-1">
                            <div class="fw-bold text-truncate text-success" style="font-size: 0.6rem;">${tip.name}</div>
                            <div style="line-height: 1; color: #333;">${tip.text}</div>
                        </div>
                    `;
                    $(`#col-round-${roundNum}`).append(itemHtml);
                });
            });

            if (isAlreadySentTipThisRound) 
            {
                $('#game-input-tip, #game-btn-send').prop('disabled', true);
            } 
            else 
            {
                $('#game-input-tip, #game-btn-send').prop('disabled', false);
            }
        });
    }

    function updateToNextRound(roomId, roundToUpdate) 
    {
        const roomRef = window.fbRef(window.fbDB, `rooms/${roomId}`);
        const nextRound = parseInt(roundToUpdate) + 1;
        
        if (nextRound <= 3) 
        {
            window.fbUpdate(roomRef, { currentRound: nextRound });
        } 
        else 
        {
            window.fbUpdate(roomRef, { status: "voting" });
        }
    }

    function checkRoundCompletion(roomId, currentRound) 
    {
        const playersRef = window.fbRef(window.fbDB, `rooms/${roomId}/players`);
        const tipsRef = window.fbRef(window.fbDB, `rooms/${roomId}/rounds/round_${currentRound}`);

        window.fbGet(playersRef).then((playersSnapshot) => 
        {
            const totalPlayers = Object.keys(playersSnapshot.val() || {}).length;

            window.fbOnValue(tipsRef, (tipsSnapshot) => 
            {
                const tips = tipsSnapshot.val() || {};
                const totalTips = Object.keys(tips).length;

                if (totalTips >= totalPlayers && totalPlayers > 0) 
                {
                    if (window.isHost) 
                    {
                        setTimeout(() => 
                        {
                            updateToNextRound(roomId, currentRound);
                        }, 800);
                    }
                }
            });
        });
    }

    window.castVote = function (roomId, votedId, event)
    {
        if (hasVoted) return;
        hasVoted = true;
        myVoteId = votedId;   

        const clickedBtn = $(event.currentTarget);
        const translatedBtnDone = i18n[currentLang]['btn_vote_done'];

        $('#voting-list button').prop('disabled', true).addClass('opacity-50');

        clickedBtn.removeClass('opacity-50')
                    .addClass('border border-warning border-4 shadow-lg')
                    .css({
                        'z-index': '10',   
                        'position': 'relative',
                        'opacity': '1'   
                    });

        clickedBtn.find('.badge')
                    .removeClass('bg-success')
                    .addClass('bg-warning text-dark')
                    .text(translatedBtnDone);

        const voteRef = window.fbRef(window.fbDB, `rooms/${roomId}/votes/${window.myLocalId}`);

        window.fbSet(voteRef, votedId).then(() => 
        {
            showFloatingAlert(i18n[currentLang].alert_vote_success, "info");
            checkVotingCompletion(roomId); 
        })
        .catch(err => 
        {
            const translatedBtnAction = i18n[currentLang]['btn_vote_action'];

            showFloatingAlert(i18n[currentLang].alert_vote_retry + " " + err,  "info");

            hasVoted = false;
            $('#voting-list button').prop('disabled', false).removeClass('opacity-50');
            clickedBtn.find('.badge').removeClass('bg-warning text-dark').addClass('bg-success').text(translatedBtnAction);
        });
    }

    function checkVotingCompletion(roomId) 
    {
        if (!window.isHost) return;

        const votesRef = window.fbRef(window.fbDB, `rooms/${roomId}/votes`);
        const playersRef = window.fbRef(window.fbDB, `rooms/${roomId}/players`);

        window.fbGet(playersRef).then((playersSnapshot) => {
        const totalPlayers = Object.keys(playersSnapshot.val() || {}).length;

        window.fbOnValue(votesRef, (votesSnapshot) => 
        {
                const votes = votesSnapshot.val() || {};
                const totalVotes = Object.keys(votes).length;

                if (totalVotes >= totalPlayers && totalPlayers > 0) 
                {   
                    window.fbOff(votesRef);
                    
                    window.fbGet(window.fbRef(window.fbDB, `rooms/${roomId}`)).then(s => 
                    {
                        processResults(roomId, s.val());
                    });
                }
            });
        });

    }

    function processResults(roomId, roomData) 
    {
        const votes = roomData.votes;
        const players = roomData.players;
        const fakeId = roomData.secret.fake;
        const secretWord = roomData.secret.word;

        const voteCounts = {};
        Object.values(votes).forEach(votedId => 
        {
            voteCounts[votedId] = (voteCounts[votedId] || 0) + 1;
        });

        let mostVotedId = null;
        let maxVotes = -1;

        for (const [id, count] of Object.entries(voteCounts)) 
        {
            if (count > maxVotes) 
            {
                maxVotes = count;
                mostVotedId = id;
            }
        }

        const playersWin = (mostVotedId === fakeId);
        const winner = playersWin ? "players" : "fake";

        const resultData = 
        {
            winner: winner,
            fakeId: fakeId,
            fakeName: players[fakeId].name,
            secretWord: secretWord,
            mostVotedId: mostVotedId,
            mostVotedName: players[mostVotedId] ? players[mostVotedId].name : "Ninguém"
        };

        const roomRef = window.fbRef(window.fbDB, `rooms/${roomId}`);
        
        window.fbUpdate(roomRef, 
        {
            result: resultData,
            status: "results"
        }).then(() => 
        {
            $('#game-voting').addClass('d-none');
        });
    }

    function showFinalResults(result, roomId) 
    {
        if (!result) return;

        $('#game-voting, #game-card, #tips-container').addClass('d-none');
        $('#game-results').removeClass('d-none').hide().fadeIn(500);

        const $title = $('#result-title');
        const $detail = $('#result-detail');
        const $fakeName = $('#result-fake-name');
        const $word = $('#result-word');

        let result_win_players_title = i18n[currentLang]['result_win_players_title'];
        let result_win_players_desc = i18n[currentLang]['result_win_players_desc']
            .replace(/{{name}}/g, `${result.mostVotedName}`);

        let result_win_impostor_title = i18n[currentLang]['result_win_impostor_title'];
        let result_win_impostor_desc = i18n[currentLang]['result_win_impostor_desc']
            .replace(/{{voted}}/g, `${result.mostVotedName}`)
            .replace(/{{impostor}}/g, `${result.fakeName}`);


        if (result.winner === 'players') 
        {
            $title.text(result_win_players_title)
                .addClass('text-success').removeClass('text-danger');
            
            $detail.text(result_win_players_desc);
        } 
        else 
        {
            $title.text(result_win_impostor_title)
                .addClass('text-danger').removeClass('text-success');
            
            $detail.text(result_win_impostor_desc);
        }

        $fakeName.text(result.fakeName.toUpperCase());
        $word.text(result.secretWord.toUpperCase());

        if (window.isHost) 
        {
            $('#btn-retry-game').removeClass('d-none');
            $('#btn-retry-game').attr('data-room', roomId);
            $('#wait-host-lobby').addClass('d-none');
        } 
        else 
        {
            $('#btn-retry-game').addClass('d-none');
            $('#wait-host-lobby').removeClass('d-none');
        }
        
        hasVoted = false;
        window.processingResults = false;
        window.isListeningTips = false;
    }

    async function skipVote(roomId) 
    {
        if (!roomId) 
        {
            showFloatingAlert(i18n[currentLang].alert_generic_error, "danger");

            return;
        }

        const roomPath = `rooms/${roomId}`;
        const roomRef = window.fbRef(window.fbDB, roomPath);

        try 
        {
            const snapshot = await window.fbGet(roomRef);
            const roomData = snapshot.val();

            if (roomData) 
            {
                const players = roomData.players || {};
                const totalPlayers = Object.keys(players).length;
                const currentVotes = roomData.skipVotes || {};
                
                currentVotes[window.myLocalId] = true;
                const voteCount = Object.keys(currentVotes).length;

                const neededVotes = Math.floor(totalPlayers / 2) + 1;

                let updates = {};

                if (voteCount >= neededVotes) 
                {
                    updates['status'] = "voting";
                    updates['skipVotes'] = null; 
                } 
                else 
                {
                    updates[`skipVotes/${window.myLocalId}`] = true;
                    showFloatingAlert(i18n[currentLang].alert_save_time_success, "info");

                }

                await window.fbUpdate(roomRef, updates);
                bootstrap.Modal.getInstance(document.getElementById('save-time-modal')).hide();
            }
        } 
        catch (error) 
        {
            showFloatingAlert(i18n[currentLang].alert_process_vote_error, "danger");

        }
    }

// *************************************************************** BTN *************************************************************
    $('.btn-back').click(function() 
    {
        const destiny = $(this).data('target');
        if (destiny) {showSection(destiny);}
    });

    $('#lobby-back').click(function() 
    {
        const modalLeave = new bootstrap.Modal(document.getElementById('room-leave-modal'));
        modalLeave.show();
    });

    $('#home-btn-play').click(function() 
    {
        var l = Ladda.create(this);
        l.start();
        //$(this).prop('disabled', true);

        window.quickMatch(l);
    });

    $('#home-btn-rooms').click(function() 
    {
        listenToRoomList();
        showSection('rooms');
    });

    $('#rooms-btn-new-room').click(function() 
    {
        const createModal = new bootstrap.Modal(document.getElementById('new-room-modal'));
        createModal.show();
    });

    $('#room-btn-confirm-newRoom').click(function() 
    {
        const theme = $('#new-room-theme').val();
        if (theme == '' || theme == null)
        {
            showFloatingAlert(i18n[currentLang].alert_select_theme, "warning");

            return;
        }

        const name = $('#player-nickname').val().trim() || generatePlayerName();
        const maxPlayers = $('#new-room-max').val();
        const language = $('#new-room-lang').val();
        const themeDesc = $('#new-room-theme option:selected').text();
        const visibility = $('input[name="roomVisibility"]:checked').val();

        bootstrap.Modal.getInstance(document.getElementById('new-room-modal')).hide();

        createRoom(name, visibility, maxPlayers, language, themeDesc, theme);
    });

    $('#lobby-btn-start').click(async function () 
    {
        var l = Ladda.create(this);
        l.start();

        //$(this).prop('disabled', true);
        startGame(l);
    });

    $('#lobby-btn-leave, #game-btn-leave').click(function() 
    {
        const modalLeave = new bootstrap.Modal(document.getElementById('room-leave-modal'));
        modalLeave.show();  
    });

    $('#lobby-btn-leave-confirm').click(function() 
    {
        const roomId = $('#lobby-room-code').text();

        clearInterval(gameInterval);
        currentRound = 1;

        if (window.myLocalId === "p1") 
        {
            const roomRef = window.fbRef(window.fbDB, `rooms/${roomId}`);

            if (typeof window.fbOff === 'function') 
            {
                window.fbOff(roomRef);
            }

            window.fbRemove(roomRef).then(() => 
            {
                showSection('home');
                $("#home-btn-play").prop('disabled', false);
            });

            window.joining = false;
        } 
        else 
        {
            leaveRoom(roomId);
            $("#home-btn-play").prop('disabled', false);
        }

        bootstrap.Modal.getInstance(document.getElementById('room-leave-modal')).hide();
    });

    $('#btn-join-code').click(function () 
    {
        $('#modalJoinRoom').modal('show');
    });

    $('#btn-confirm-join').click(function () 
    {
        const code = $('#input-room-code').val().trim().toUpperCase();

        if (code.length === 5) 
        {
            $('#btn-confirm-join').prop('disabled', true);
            let name = $('#input-room-player-name').val().trim();
            
            if (name === "") 
            {
                name = "Player_" + Math.floor(Math.random() * 999);
            }

            $('#modalJoinRoom').modal('hide');
            joinRoom(code, name);
        } 
        else 
        {
            showFloatingAlert(i18n[currentLang].alert_code_length, "danger");

        }
    });

    $('#game-btn-send').click(function() 
    {
        const tip = $('#game-input-tip').val().trim();
        if (tip === "") return;

        const roomId = $('#lobby-room-code').text().trim();

        const myId = window.myLocalId;
        const myName = window.myLocalName;

        const path = "rooms/" + roomId + "/rounds/round_" + currentRound + "/" + myId;
        const tipRef = window.fbRef(window.fbDB, path);
        
        window.fbSet(tipRef, 
        {
            name: myName,
            text: tip,
            timestamp: Date.now()
        }).then(() => 
        {
            $('#game-input-tip').val("");
            $('#game-input-tip, #game-btn-send').prop('disabled', true);
        });
    });

    $('#btn-retry-game').click(function() 
    {
        const roomId = $(this).attr('data-room');
    
        if (!roomId) return;
        if (!window.isHost) return;

        const roomRef = window.fbRef(window.fbDB, `rooms/${roomId}`);

        const resetData = 
        {
            status: "waiting",    
            currentRound: 1,        
            votes: null,          
            result: null,        
            rounds: null,          
            secret: null,
            skipVotes: null
        };

        window.fbUpdate(roomRef, resetData);

    });

    $('#btn-save-time').click(function() 
    {
        const modalLeave = new bootstrap.Modal(document.getElementById('save-time-modal'));
        modalLeave.show();  
    });

    $('#btn-save-time-confirm').click(function() 
    {
        const roomId = $('#lobby-room-code').text().trim();
        skipVote(roomId);
    });

    $('#lang_filter, #theme_filter').on('change', () => 
    {
        listenToRoomList();
    });

    $('#home-info-btn').click(function () 
    {
        showSection('info');
    });

    $('#home-intruction-btn').click(function () 
    {
        showSection('intruction');
    });

// ******************************************************************* ----- **********************************************************
});
echo 'Starting local development environment...'
start powershell -argumentlist "-noexit","-command","grunt build"
start powershell -argumentlist "-noexit","-command","http-server"
start powershell -argumentlist "-noexit","-command","node ./server/compiled/deck-of-cards-server.js debug"
code .
code ./server/
start http://localhost:8080
exit
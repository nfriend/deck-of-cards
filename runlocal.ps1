echo 'Starting local development environment...'
echo 'Start grunt build...'
start powershell -argumentlist "-noexit","-command","grunt build"
echo 'Start local HTTP server...'
start powershell -argumentlist "-noexit","-command","http-server"
echo 'Start local WebSocket server...'
start powershell -argumentlist "-noexit","-command","node ./server/compiled/deck-of-cards-server.js debug"
echo 'Start deck-of-cards Code instance...'
code .
echo 'Start deck-of-cards server Code instance...'
code ./server/
echo 'Opening up local site in Chrome...'
start http://localhost:8080
echo 'Opening up a git bash window at the root of the repo...'
cd G:\deck-of-cards
start "C:\Program Files\Git\git-bash.exe"
echo 'Done.  Happy developing.'
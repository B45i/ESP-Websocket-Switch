const socket = io();

const toggleBtn = document.getElementById('toggleBtn');

let buttonState = false;

toggleBtn.addEventListener('click', () => {
    buttonState = !buttonState;
    updateUI();
    socket.emit('buttonState', buttonState);
});

const updateUI = () => {
    buttonState
        ? toggleBtn.classList.add('on')
        : toggleBtn.classList.remove('on');
    toggleBtn.innerText = buttonState ? 'Turn off' : 'Turn on';
};

socket.on('buttonState', state => {
    console.log('updated state', state);
    buttonState = state;
    updateUI();
});

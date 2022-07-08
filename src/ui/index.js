const socket = io();

this.switch = document.getElementById('switch');

let buttonState = false;

this.switch.addEventListener('click', () => {
    buttonState = !buttonState;
    buttonState
        ? this.switch.classList.add('on')
        : this.switch.classList.remove('on');
    this.switch.innerText = buttonState ? 'Turn off' : 'Turn on';
    socket.emit('buttonState', buttonState);
});

document.getElementById('call').addEventListener('click', () => {
      window.parent.postMessage(
          {type: 'START_CALL'}, '*');
    },
    false,
);
document.getElementById('hang').addEventListener('click', () => {
      window.parent.postMessage(
          {type: 'END_CALL'}, '*');
    },
    false,
);

window.addEventListener('message', (message) => {
  if (message.data.type === 'UPDATE_DURATION') {
    document.getElementById('duration').textContent = message.data.duration;
  }
});
document.getElementById('theButton').addEventListener('click',
  function () {
    window.parent.postMessage({type: 'FROM_PAGE', text: 'Hello from the iframe!'},
      '*')
  }, false)

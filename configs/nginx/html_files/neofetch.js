const foregroundcolours = {
  30: 'hsl(0, 0%, 0%)',      // Black
  31: 'hsl(0, 100%, 50%)',  // Red
  32: 'hsl(120, 100%, 25%)', // Green
  33: 'hsl(60, 100%, 50%)',  // Yellow
  34: 'hsl(240, 100%, 50%)', // Blue
  35: 'hsl(300, 100%, 50%)', // Purple
  36: 'hsl(180, 100%, 50%)', // Cyan
  37: 'hsl(0, 0%, 100%)',    // White
  39: 'hsl(0, 0%, 100%)',    // White (assuming same as 37)
  0: 'hsl(0, 0%, 100%)'      // White (assuming same as 37)
};

const backgroundcolours = {
  40: 'hsl(0, 0%, 0%)',      // Black
  41: 'hsl(0, 100%, 50%)',  // Red
  42: 'hsl(120, 100%, 25%)', // Green
  43: 'hsl(60, 100%, 50%)',  // Yellow
  44: 'hsl(240, 100%, 50%)', // Blue
  45: 'hsl(300, 100%, 50%)', // Purple
  46: 'hsl(180, 100%, 50%)', // Cyan
  47: 'hsl(0, 0%, 100%)',    // White
  0: 'none'                 // Transparent (none for background)
};

const twofivesixColoursBackground = {
  '[48;5;8m': 'rgb(51, 51, 51)',
  '[48;5;9m': 'rgb(214, 51, 51)',
  '[48;5;10m': 'rgb(51, 214, 51)',
  '[48;5;11m': 'rgb(214, 214, 51)',
  '[48;5;12m': 'rgb(51, 51, 214)',
  '[48;5;13m': 'rgb(214, 51, 214)',
  '[48;5;14m': 'rgb(51, 214, 214)',
  '[48;5;15m': 'rgb(214, 214, 214)',
  0: null
};

function convertAnsiToHtml(text) {
  let result = '';
  let currentSeq = '';
  let currentforeColour = null;
  let currentbackColour = null;
  let specialColour = twofivesixColoursBackground[0]
  let shouldEnd = 0;
  let zeromcounter = 0;
  let insideEscapeSeq = false;

  for (let i = 0; i < text.length; i++) {
    if (insideEscapeSeq && text[i] === '\x1b' || text[i] === 'm') {
      const regexnormal = /\[(\d+)m/;
      const regexintensity = /\[(\d+);(\d+);(\d+)m/;
      const regexEnd = /\[m/;
      const regexZeroM = /\[0m/;

      if (text[i] === 'm') currentSeq += 'm';
      const match = currentSeq.match(regexnormal);
      const matchintensity = currentSeq.match(regexintensity);
      const matchEnd = currentSeq.match(regexEnd);
      const matchZeroM = currentSeq.match(regexZeroM);

      if (matchEnd && matchEnd[0]) {
        if (shouldEnd === 1) {
          break;
        }
        else {
          shouldEnd++;
        }
      }

      if (matchZeroM && matchZeroM[0]) {
        zeromcounter++;
        if (zeromcounter === 14) {
          const neofetchElement = document.getElementById('neofetch-logo');
          neofetchElement.innerHTML = result;
          result = '';
        }
      }

      if (match && match[1]) {
        if (Object.keys(foregroundcolours).includes(match[1])) {
          currentforeColour = match[1];
        }
        if (Object.keys(backgroundcolours).includes(match[1])) {
          currentbackColour = match[1];
        }
      }
      if (matchintensity && matchintensity[0]) {
        if (Object.keys(twofivesixColoursBackground).includes(matchintensity[0])) {
          specialColour = matchintensity[0];
        }
      }
      currentSeq = '';
    }
    if (text[i] === '\x1b' && text[i + 1] === '[') {
      insideEscapeSeq = true;
      currentSeq += text[i];
      currentSeq += text[i + 1];
      i++;
      continue;
    }

    if (insideEscapeSeq && text[i] === 'm' || text[i] === '\x1b') {
      insideEscapeSeq = false;
      currentSeq = '';
      continue;
    }

    if (insideEscapeSeq) {
      currentSeq += text[i];
    }

    if (!insideEscapeSeq) {
      if (text[i] === '\n') {
        result += '<br>';
      } else {
        if (specialColour !== null) {
          result += `<span style="color: ${foregroundcolours[currentforeColour]}; background-color: ${twofivesixColoursBackground[specialColour]};">${text[i]}</span>`;
        }
        else if (currentforeColour) {
          result += `<span style="color: ${foregroundcolours[currentforeColour]}; background-color: ${backgroundcolours[currentbackColour]};">${text[i]}</span>`;
        } else {
          result += text[i];
        }
      }
    }
  }

  const neofetchElement = document.getElementById('neofetch-info');
  neofetchElement.innerHTML = result;
}

function loadNeofetch() {
  fetch('neofetch.txt')
    .then(response => response.text())
    .then(data => {
      console.log(data);
      this.convertAnsiToHtml(data);
    })
    .catch(error => {
      console.error('Error fetching neofetch data:', error);
    });
}

// Load neofetch data initially
document.addEventListener('DOMContentLoaded', function () {
  loadNeofetch();
});

// Update neofetch data every 5 seconds
setInterval(loadNeofetch, 5000);
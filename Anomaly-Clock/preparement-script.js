Array.from(document.getElementsByClassName('nums-row')).forEach(ele => {
    const text = ele.textContent.trim();
    ele.innerHTML = '';
    [...text].forEach(char => {
      const p = document.createElement('p');
      p.textContent = char;
      ele.appendChild(p);
    });
  });
  
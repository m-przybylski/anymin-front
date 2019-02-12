(function() {
  const iconsWrapper = document.getElementById('icons-wrapper');
  const listItems = iconsWrapper.getElementsByTagName('li');
  const result = [];
  for (var i = 0; i < listItems.length; i++) {
    const beforeContentChar = window
      .getComputedStyle(listItems[i].getElementsByTagName('i')[0], '::before')
      .getPropertyValue('content')
      .replace(/'/g, '')
      .replace(/"/g, '');
    const beforeContent = beforeContentChar.charCodeAt(0).toString(16);

    listItems[i].getElementsByTagName('i')[0].classList.remove('icon');
    result.push([listItems[i].getElementsByTagName('i')[0].classList[0].replace('icon-', ''), beforeContent]);
  }

  let string = '';
  result.map(a => {
    if (string == '') {
      string = `$icons: (${a[0]}: ${a[1]})
`;
    } else {
      string += `$icons: map-merge($icons, (${a[0]}: ${a[1]}))
`;
    }
  });
  console.log(string);
})();

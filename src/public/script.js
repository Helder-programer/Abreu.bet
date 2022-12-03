window.onload = () => {
    let shotGreen = document.querySelectorAll('.green');

    shotGreen.forEach(element => {
        if (element.innerText == 'yes') {
            element.parentElement.style.backgroundColor = '#00FF7F';
        } else {
            element.parentElement.style.backgroundColor = '	#DC143C'
        }
    });
}
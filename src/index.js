console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

document.addEventListener("DOMContentLoaded", () => {
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const imageContainer = document.getElementById('dog-image-container');
            data.message.forEach(imgSrc => {
                const imgElement = document.createElement('img');
                imgElement.src = imgSrc;
                imageContainer.appendChild(imgElement);
            });
        })

    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breedsList = document.getElementById('dog-breeds');
            const breeds = data.message;

            const renderBreeds = (filterLetter) => {
                breedsList.innerHTML = '';
                for (const breed in breeds) {
                    if (breeds.hasOwnProperty(breed) && (filterLetter === '' || breed.startsWith(filterLetter))) {
                        const listItem = document.createElement('li');
                        listItem.textContent = breed;
                        listItem.addEventListener('click', () => {
                            listItem.style.color = 'blue';
                        });
                        breedsList.appendChild(listItem);
                    }
                }
            };

            renderBreeds('');

            const breedDropdown = document.getElementById('breed-dropdown');
            breedDropdown.addEventListener('change', (event) => {
                const selectedLetter = event.target.value;
                renderBreeds(selectedLetter);
            });
        })
});

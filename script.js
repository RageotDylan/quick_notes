function createNoteElement(inputValues) {
    // Création du container principal
    const containerNote = document.createElement('div');
    containerNote.classList.add('container_note');

    // Création du container de style
    const containerStyle = document.createElement('div');
    containerStyle.classList.add('container_style');
    containerNote.appendChild(containerStyle);

    // Création du container de couleurs
    const colorContainer = document.createElement('div');
    colorContainer.classList.add('color_container_note');
    containerStyle.appendChild(colorContainer);

    // Ajout des divs de couleur
    const colors = ['blue', 'red', 'green'];
    colors.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.id = color;
        colorDiv.classList.add(`color_${color}`);
        colorContainer.appendChild(colorDiv);
    });

    // Ajout du titre
    const title = document.createElement('h2');
    title.classList.add('title_note');
    title.textContent = inputValues.title;
    containerStyle.appendChild(title);

    // Ajout du sous-titre
    const subtitle = document.createElement('h3');
    subtitle.classList.add('subtitle_note');
    subtitle.textContent = inputValues.subtitle;
    containerNote.appendChild(subtitle);

    // Ajout du texte
    const text = document.createElement('p');
    text.classList.add('text_note');
    text.textContent = inputValues.text;
    containerNote.appendChild(text);

    return containerNote;
}

function addNoteToContainer(noteElement) {
    const container = document.querySelector('.container');
    container.insertBefore(noteElement, container.children[1]);
}

function clearInputFields() {
    ['title', 'subtitle', 'text'].forEach(id => {
        document.getElementById(id).value = '';
    });
}

// Ajout des écouteurs d'événements pour les boutons de couleur
function addColorChangeListeners(noteElement) {
    ['blue', 'red', 'green'].forEach(color => {
        const colorDiv = noteElement.querySelector(`#${color}`);
        colorDiv.addEventListener('click', () => {
            noteElement.style.backgroundColor = color;
        });
    });
}

// Modification de getValue pour inclure l'ajout des écouteurs de couleur
function getValue() {
    const inputValues = {
        title: document.getElementById('title').value.trim() || "Titre non spécifié",
        subtitle: document.getElementById('subtitle').value.trim() || "Sous-titre non spécifié",
        text: document.getElementById('text').value.trim() || "Texte non spécifié"
    };

    const newNote = createNoteElement(inputValues);
    addColorChangeListeners(newNote);
    addNoteToContainer(newNote);
    clearInputFields();

    // Mettre à jour la recherche
    const searchBar = document.getElementById('searchBar');
    filterNotes(searchBar.value.toLowerCase());
}

// Ajout de l'écouteur d'événement au bouton de validation
document.querySelector('button').addEventListener('click', getValue);

function initSearchBar() {
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterNotes(searchTerm);
    });
}

function filterNotes(searchTerm) {
    const notes = document.querySelectorAll('.container_note:not(:first-child)');
    notes.forEach(note => {
        const titleElement = note.querySelector('.title_note');
        if (titleElement) {
            const title = titleElement.textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                note.style.display = '';
            } else {
                note.style.display = 'none';
            }
        }
    });
}

// Appelez cette fonction lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    initSearchBar();
    document.querySelector('button').addEventListener('click', getValue);
});
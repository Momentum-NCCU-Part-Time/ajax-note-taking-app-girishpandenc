const app = {
  data: {
    url:"http://localhost:3000/notes",
    notes:[]
  },

  getNotes: function() {
    let container = document.getElementById('container')
    fetch(this.data.url, {
      method: 'GET',
      headers: {"Content-Type": "application/json"}
    })
    .then(r => r.json())
    .then(response => {
      for (let note of response) {
        this.data.notes.push(note)
      };
      this.generateNotesHTML()
    }
    )
  },

  deleteNote: function(noteID) {
    fetch(this.data.url + noteID, {
      method: 'DELETE',
      headers: {"Content-Type": "application/json"}
  })
  .then(r => r.json())
  .then(response => {
    for (let note of response) {
      this.data.notes.pop(note)
    };
    this.generateNotesHTML();
  })

},

  confirmDelete: function() {

  },


  generateNotesHTML: function() {
    const container = document.getElementById('container');
    for (let note of this.data.notes) {
      container.innerHTML += `
      <div>
        <div>${note.title}</div>
        <div>${note.body}</div>
        <button data id=$(note.id)>EDIT</button>
        <button class="deleteButton" data-id=$(note.id)>DELETE</button>
      </div>
     `}
     this.addEventListeners();
    },
    
  addEventListeners: function() {
    let deleteButtons = document.querySelectorAll(".deleteButton");
    for (let button of deleteButtons) {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        this.deleteNote(button.dataset.id);
      })
    }
  },
    
  main: function () {

    this.getNotes();

  }
  
}

app.main()
const modalWrapper = document.querySelector('.modal-wrapper');
// modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

// modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');

const btnAdd = document.querySelector('.btn-add');

const tableNotlar = document.querySelector('.table-users');

let id;

// Create element and render Notlar
const renderUser = doc => {
  const tr = `
    <tr data-id='${doc.id}'>
      <td>${doc.data().not}</td>
      <td style="text-align: center;">${doc.data().not_saati}</td>
      <td>
      <button class="btn btn-edit"><i class="material-icons">create</i></button>
      <button class="btn btn-delete"><i class="material-icons">remove_circle_outline</i></button>

      </td>
    </tr>
    
  `;
  tableNotlar.insertAdjacentHTML('beforeend', tr);

  // Click edit user not_saati
  const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
  btnEdit.addEventListener('click', () => {
    editModal.classList.add('modal-show');

    id = doc.id;
    editModalForm.not.value = doc.data().not;
    editModalForm.not_saati.value = doc.data().not_saati;
 
  });

  // Click delete user
  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);

  btnDelete.addEventListener("click", function() {
    var r = confirm("Silmek istiyor musunuz?");
    if (r == true) {

      db.collection('notlar').doc(`${doc.id}`).delete().then(() => {
        console.log('Document succesfully deleted!');
      }).catch(err => {
        console.log('Error removing document', err);
      });
  
    }
     
    if (r == false) {
       /* No delete*/
    } 
    
  }); 

    
}

// Click add user button
btnAdd.addEventListener('click', () => {
  addModal.classList.add('modal-show');

  addModalForm.not.value = '';
  addModalForm.not_saati.value = '';
});

// User click anyware outside the modal
window.addEventListener('click', e => {
  if(e.target === addModal) {
    addModal.classList.remove('modal-show');
  }
  if(e.target === editModal) {
    editModal.classList.remove('modal-show');
  }
});

// Get all Notlar
// db.collection('Notlar').get().then(querySnapshot => {
//   querySnapshot.forEach(doc => {
//     renderUser(doc);
//   })
// });


// Real time listener





db.collection("notlar").orderBy("not_saati", "asc").onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderUser(change.doc);
    }
    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableNotlar.removeChild(tbody);
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableNotlar.removeChild(tbody);
      renderUser(change.doc);
    }
  })
})

/*


db.collection('notlar').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderUser(change.doc);
    }
    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableNotlar.removeChild(tbody);
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableNotlar.removeChild(tbody);
      renderUser(change.doc);
    }
  })
})

*/

// Click submit in add modal
addModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('notlar').add({
    not: addModalForm.not.value,
    not_saati: addModalForm.not_saati.value,
  });
  modalWrapper.classList.remove('modal-show');
});

// Click submit in edit modal
editModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('notlar').doc(id).update({ 
    not: editModalForm.not.value,
    not_saati: editModalForm.not_saati.value,
  });
  editModal.classList.remove('modal-show');
  
});


const modalWrapper = document.querySelector('.modal-wrapper');
// modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

// modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');

const btnAdd = document.querySelector('.btn-add');

const tablePersoneller = document.querySelector('.table-users');



let id;

// Create element and render Personeller
const renderUser = doc => {
  const tr = `
    <tr data-id='${doc.id}'>
      <td>${doc.data().personel_isim}</td>
  
      <td style="text-align: center;">${doc.data().personel_durum}</td>
       
      <td>
       <button class="btn btn-edit"><i class="material-icons">create</i></button>
       <button class="btn btn-delete"><i class="material-icons">remove_circle_outline</i></button>
     </td>
    </tr>
  `;
  
 /*
 
 */

  tablePersoneller.insertAdjacentHTML('beforeend', tr);

  // Click edit user
  const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
  btnEdit.addEventListener('click', () => {
    editModal.classList.add('modal-show');

    id = doc.id;
    editModalForm.personel_isim.value = doc.data().personel_isim;
    editModalForm.personel_durum.value = doc.data().personel_durum;

  

  });

  // Click delete user
  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);

  btnDelete.addEventListener("click", function() {
    var r = confirm("Silmek istiyor musunuz?");
    if (r == true) {

      db.collection('personeller').doc(`${doc.id}`).delete().then(() => {
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

  addModalForm.personel_isim.value = '';
  addModalForm.personel_durum.value = '';

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

/*
  Get all Personeller
 db.collection('personeller').get().then(querySnapshot => {
   querySnapshot.forEach(doc => {
     renderUser(doc);
   })
 });

 ------------------------------------------------------------------------

db.collection('personeller').orderBy("personel_durum", "asc").get().then(querySnapshot => {
  querySnapshot.forEach(doc => {
    renderUser(doc);
  })
});


*/ 




// Real time listener

db.collection('personeller').orderBy("personel_durum", "asc").onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderUser(change.doc);
    }
    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tablePersoneller.removeChild(tbody);
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tablePersoneller.removeChild(tbody);
      renderUser(change.doc);
    }
  })
}) 

/*
db.collection('personeller')

.onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderUser(change.doc);
    }
    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tablePersoneller.removeChild(tbody);
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tablePersoneller.removeChild(tbody);
      renderUser(change.doc);
    }
  })
}) 

 */


// Click submit in add modal
addModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('personeller').add({
    personel_isim: addModalForm.personel_isim.value,
    personel_durum: addModalForm.personel_durum.value,
  });
  modalWrapper.classList.remove('modal-show');
});

// Click submit in edit modal
editModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('personeller').doc(id).update({
    personel_isim: editModalForm.personel_isim.value,
    personel_durum: editModalForm.personel_durum.value,
  });
  editModal.classList.remove('modal-show');
  
});



  

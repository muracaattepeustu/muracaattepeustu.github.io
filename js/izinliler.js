const modalWrapper = document.querySelector('.modal-wrapper');
// modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

// modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');


//add
const btnAdd = document.querySelector('.btn-add');

//close
const btnClose = document.querySelector('.btn-close');



const btnEdit = document.querySelector('btn-edit');

const tableIzinliler = document.querySelector('.table-users');

let id;


const renderUser = doc => {
  const tr = `
    <tr data-id='${doc.id}'>
      <td>${doc.data().izinli_isim}</td>
      <td>${doc.data().izinli_grup}</td> 
      <td>${doc.data().izinli_nevi}</td>
      <td>${doc.data().izinli_cikis_saati}</td>
      <td>${doc.data().izinli_gelis_saati}</td>
      <td>
      
        <button class="btn btn-edit"><i class="material-icons">create</i></button>
        <button class="btn btn-delete"><i class="material-icons">remove_circle_outline</i></button>
      </td>
    </tr>
  `;
  tableIzinliler.insertAdjacentHTML('beforeend', tr);

   //Fonsksiyon  

 
        


  // Click edit user
  const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);

  btnEdit.addEventListener('click', () => {
    editModal.classList.add('modal-show');

    id = doc.id;
    editModalForm.izinli_isim.value = doc.data().izinli_isim;
    editModalForm.izinli_grup.value = doc.data().izinli_grup;
    editModalForm.izinli_nevi.value = doc.data().izinli_nevi;
    editModalForm.izinli_cikis_saati.value = doc.data().izinli_cikis_saati;
    editModalForm.izinli_gelis_saati.value = doc.data().izinli_gelis_saati;

  });

 


  // Click delete user
  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);

  btnDelete.addEventListener("click", function() {
    var r = confirm("Silmek istiyor musunuz?");
    if (r == true) {

      db.collection('izinliler').doc(`${doc.id}`).delete().then(() => {
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
  addModalForm.izinli_isim.value = ''; 
  addModalForm.izinli_grup.value = '';
  addModalForm.izinli_nevi.value = '';
  addModalForm.izinli_cikis_saati.value = '';
  addModalForm.izinli_gelis_saati.value = '';
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

btnClose.addEventListener('click', e => {
  if(e.target === addModal) {
    addModal.classList.remove('modal-show');
  }  

  if(e.target === editModal) {
    editModal.classList.remove('modal-show');
  }

});
*/



btnClose.onclick = function(event) {
  if (event.target == addModal) {
    addModal.style.display = "none";
  }
}


// Get all Izinliler
// db.collection('izinliler').get().then(querySnapshot => {
//   querySnapshot.forEach(doc => {
//     renderUser(doc);
//   })
// });





// Real time listener



db.collection("izinliler").orderBy("izinli_grup", "asc").onSnapshot(snapshot => {

  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderUser(change.doc);
    }


    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableIzinliler.removeChild(tbody);
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableIzinliler.removeChild(tbody);
      renderUser(change.doc);
    }
  })
})

/*


db.collection('izinliler').onSnapshot(snapshot => {

  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderUser(change.doc);
    }


    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableIzinliler.removeChild(tbody);
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableIzinliler.removeChild(tbody);
      renderUser(change.doc);
    }
  })
})
*/

// Click submit in add modal
addModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('izinliler').add({
    izinli_isim: addModalForm.izinli_isim.value,
    izinli_grup: addModalForm.izinli_grup.value,
    izinli_nevi: addModalForm.izinli_nevi.value,
    izinli_cikis_saati: addModalForm.izinli_cikis_saati.value,
    izinli_gelis_saati: addModalForm.izinli_gelis_saati.value,
  });
  modalWrapper.classList.remove('modal-show');
});

// Click submit in edit modal
editModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('izinliler').doc(id).update({
    izinli_isim: editModalForm.izinli_isim.value,
    izinli_grup: editModalForm.izinli_grup.value,
    izinli_nevi: editModalForm.izinli_nevi.value,
    izinli_cikis_saati: editModalForm.izinli_cikis_saati.value,
    izinli_gelis_saati: editModalForm.izinli_gelis_saati.value,
  });
  editModal.classList.remove('modal-show');
  
});




/*

var navItems = document.querySelectorAll(".mobile-bottom-nav__item");
navItems.forEach(function(e, i) {
	e.addEventListener("click", function(e) {
		navItems.forEach(function(e2, i2) {
			e2.classList.remove("mobile-bottom-nav__item--active");
		})
		this.classList.add("mobile-bottom-nav__item--active");
	});
});

*/
      

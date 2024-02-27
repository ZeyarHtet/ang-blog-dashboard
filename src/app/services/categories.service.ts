import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  saveData(data: any){
    this.afs.collection('categories').add(data).then(docRef => {
      console.log(docRef);
      this.toastr.success('Data Inserted Successfully!');
    })
    .catch(err => {console.log(err)})
  }

  loadData(){
    return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data};
        })
      })
    )
  }

  updateData(id: any, EditaData: any){
    // this.afs.collection('categories').doc(id).update(EditaData).then(docRef => {
    //   this.toastr.success('Data updated successfully!');
    // })
    this.afs.doc(`categories/${id}`).update(EditaData).then(docRef =>{
      this.toastr.success('Data updated successfully!');
    })
  }

  deleteData(id: any){
    this.afs.doc(`categories/${id}`).delete().then(docRef =>{
      this.toastr.success('Data deleted.');
    })
  }
}
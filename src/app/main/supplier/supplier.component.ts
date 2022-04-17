import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SupplierModel } from 'src/app/core/models/supplier.model';
import { SupplierService } from 'src/app/core/services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  term: any;
  listSupplier: SupplierModel[];
  supplier: SupplierModel = new SupplierModel;
  mode: any = 'view';

  constructor(public formBuilder: FormBuilder, private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.timer();
    this.breadCrumbItems = [{ label: 'POC GSL' }, { label: 'Depositos', active: true }];
    this.load();
  }

  basicMessage(msg: string) {
    Swal.fire({
      title: msg,
      confirmButtonColor: '#5438dc',
    });
  }

  load() {
    this.supplierService.list().subscribe((listSupplierModel: SupplierModel[]) => {
      this.listSupplier = listSupplierModel;
      this.alterMode('view', null);
    });
  }

  alterMode(mode: string, id: string) {
    if(mode == 'add'){
      this.supplier = new SupplierModel;
      this.mode = mode;
    }
    else if(mode == 'edit') {
      this.supplierService.read(id).subscribe((supplierModel: SupplierModel) => {
        this.supplier = supplierModel;
        setTimeout(() => {
          this.mode = mode;  
        }, 500);
      })
    }
    else
      this.mode = mode;
  }

  delete(id: string){
    this.supplierService.remove(id).subscribe((supplierModel: SupplierModel) => {
      this.load();
      this.basicMessage('Operação efetuada com sucesso');
    })
  }

  save() {
    this.supplierService.save(this.supplier).subscribe((supplierModel: SupplierModel) => { this.load(); });
    this.basicMessage('Operação efetuada com sucesso');
  }

  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  
  timer() {
    let timerInterval;
    Swal.fire({
      title: 'Carregando...',
      timer: 2000,

      onBeforeOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          Swal.getContent().querySelector('strong').textContent = Swal.getTimerLeft() + '';
        }, 100);
      },
      onClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (
        result.dismiss === Swal.DismissReason.timer
      ) {
        console.log('I was closed by the timer');
      }
    });
  }

}

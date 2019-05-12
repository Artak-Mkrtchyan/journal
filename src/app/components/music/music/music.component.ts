import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';

import { selectPlayer } from '@store/selectors/player.selector';
import { LoadLocalFile } from '@store/actions/player.actions';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  @ViewChild('audio') audio: ElementRef;
  @ViewChild('inputFile') inputFile: ElementRef;

  formGroup = this.fb.group({
    file: [null, Validators.required]
  });



  // Create Form data

  onFileChange(event) {
    const reader = new FileReader();
    // console.log(event);
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        });

        // let music = new Audio();
        // music.src = reader.result;
        // music.load();
        // music.play();
        this.store.dispatch(new LoadLocalFile(file));
        this.audio.nativeElement.src = reader.result;
        // this.audio.nativeElement.play();

        this.cd.markForCheck();

        // console.log(event.target.files, reader);
      };
    }
  }

  getLocalFile() {
    this.store.select(selectPlayer).subscribe(file => {
      console.log(file);
      const reader = new FileReader();
      reader.readAsDataURL(file.file);
      reader.onload = () => {
        const music = new Audio();
        music.src = reader.result;
        music.load();
        music.play();
      };
    });
  }

  uploadFile() {
    // const formData = new FormData();
    const file = this.inputFile.nativeElement.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // formData.append('file', file, file.result);
      const fileData = (reader.result as string).split(',')[1];
      console.log(reader.result);
      this.http.post('api/player', { file: fileData })
      .subscribe(
          (data: any) => {
              console.log('Subscribe data', data);
          }
      );

    };
    console.log(file);

    // formData.forEach(data => {
    //   console.log(data);
    // });
  }

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private store: Store<IAppState>,
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }
}

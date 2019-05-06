import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  @ViewChild('audio')
  audio: ElementRef;

  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  onFileChange(event) {
    const reader = new FileReader();
    console.log(event);
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        });

        this.audio.nativeElement.src = reader.result;
        this.audio.nativeElement.play();

        this.cd.markForCheck();

      };
      console.log(this.audio, file);
    }
  }

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }
}

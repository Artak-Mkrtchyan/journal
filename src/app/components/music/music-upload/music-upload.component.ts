import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

import { Validators, FormBuilder } from '@angular/forms';
import { PlayerService } from '@service/player.service';

@Component({
  selector: 'app-music-upload',
  templateUrl: './music-upload.component.html',
  styleUrls: ['./music-upload.component.scss']
})
export class MusicUploadComponent implements OnInit {
  @ViewChild('inputFile') inputFile: ElementRef;

  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private playerService: PlayerService
  ) {}

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        });

        // const fileData = (reader.result as string).split(',')[1];

        this.playerService.setAudioFile(file, reader.result);
        this.cd.markForCheck();
        this.togglePlayerStatus();
      };
    }
  }

  togglePlayerStatus() {
    this.playerService.togglePlayerStatus();
  }

  ngOnInit() {}
}

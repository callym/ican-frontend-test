import { Component, ViewChild } from '@angular/core';

import { Slides } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('slider') slider: Slides;

  title: String;
  subtitle: String;

  user: {
    name: String,
    date_of_birth: String,
    gender: String,
    nationality: String,
    current_school: String,
    current_major: String,
    current_gpa: Number,
    label: Array<String>,
    lifestyle: Array<String>,
  };

  gender_data: Array<String>;
  nationality_data: Array<String>;

  label_data: Array<{
    name: String,
    added: Boolean
  }>;

  lifestyle_data: Array<{
    name: String,
    added: Boolean
  }>;

  constructor() {
    this.gender_data = ['Female', 'Male', 'Other'];
    this.nationality_data = ['Chinese', 'English'];

    this.label_data = [
      { name: 'Outgoing', added: false },
      { name: 'Reserved', added: false },
      { name: 'Sporty', added: false },
      { name: 'Routine', added: false },
      { name: 'Flexible', added: false },
      { name: 'Neutral', added: false }
    ];

    this.lifestyle_data = [
      { name: 'Fast', added: false },
      { name: 'Party', added: false },
      { name: 'Quiet', added: false },
      { name: 'Posh', added: false },
      { name: 'Budget', added: false },
      { name: 'Neutral', added: false }
    ];

    this.user = {
      name: '',
      date_of_birth: '',
      gender: '',
      nationality: '',
      current_school: '',
      current_major: '',
      current_gpa: NaN,
      label: [],
      lifestyle: []
    };
  }

  ngAfterViewInit() {
    this.slider.lockSwipes(true);
    this.onSlideChangeStart();
  }

  onSlideChangeStart() {
    let current_index = this.slider.getActiveIndex();

    if (current_index === undefined) {
      current_index = 0;
    }

    if (current_index === 0) {
      this.title = "Basic Information";
      this.subtitle = "Get your UniPanda 🐼";
    } else {
      this.title = "Tell us more about you";
      this.subtitle = "Help us to personalise your assistant";
    }
  }

  print_user() {
    var json_user = JSON.stringify(this.user, null, 2);
    console.log(json_user);
  }

  // need to unlock and re-lock swiping
  // so will wrap in this function so we
  // can't forget to do that!
  do_slide(forwards: Boolean) {
    // we lock the swipe to stop people progressing
    // through the form when they haven't filled it in
    // so first we have to unlock it
    this.slider.lockSwipes(false);
    forwards == true ? this.slider.slideNext() : this.slider.slidePrev();
    this.slider.lockSwipes(true);
  }

  next() {
    this.print_user();
    this.do_slide(true);
  }

  previous() {
    this.print_user();
    this.do_slide(false);
  }
}

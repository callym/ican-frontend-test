import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('slider') slider: Slides;

  title: String;
  subtitle: String;

  slide_one_form: FormGroup;

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

  constructor(form_builder: FormBuilder) {
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

    this.slide_one_form = form_builder.group({
      name: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      current_school: ['', Validators.required],
      current_major: ['', Validators.required],
      current_gpa: ['', Validators.required]
    });
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
    // there doesn't seem to be a nice way of 
    // just copying the form.value object
    // into the this.user object by value,
    // but just copying the properties
    // manually works fine here!
    var v = this.slide_one_form.value;
    this.user.name = v.name;
    this.user.date_of_birth = v.date_of_birth;
    this.user.gender = v.gender;
    this.user.nationality = v.nationality;
    this.user.current_school = v.current_school;
    this.user.current_major = v.current_major;
    this.user.current_gpa = v.current_gpa;

    this.print_user();
    this.do_slide(true);
  }

  previous() {
    this.print_user();
    this.do_slide(false);
  }

  addTagExisting(name: String, p: String) {
    for (var l in this[`${p}_data`]) {
      if (this[`${p}_data`][l].name === name) {
        this[`${p}_data`][l].added = true;
        this.user[`${p}`].push(name);
      }
    }
  }

  addTagExistingLabel = (name) => this.addTagExisting(name, 'label');
  addTagExistingLifestyle = (name) => this.addTagExisting(name, 'lifestyle');
}

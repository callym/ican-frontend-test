import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

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

  constructor(public navCtrl: NavController) {
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

}

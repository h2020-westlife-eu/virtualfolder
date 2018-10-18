/**
 * Created by Tomas Kulhanek on 1/9/17.
 */

export class SettingsSubmitted {
  constructor(settings){
    this.settings = settings;
  }
}

export class SettingsSelected {
  constructor(settings){
    this.settings = settings;
  }
}

export class SettingsRemoved {
  constructor(settings){
    this.settings = settings;
  }
}

export class SettingsMigrated {
  constructor(settings){
    this.settings = settings;
  }
}
